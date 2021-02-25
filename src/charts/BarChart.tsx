import React, {useEffect} from 'react';
import * as d3 from 'd3';

import {COLORS} from '../colors';
import HoverPanel from "./HoverPanel";
import {Entry} from "../Interfaces";


export default function BarChart(props: { entries: Entry[] }) {
    useEffect(() => {
        const margin = {top: 15, right: 0, bottom: 30, left: 60},
            barHeight = 25,
            height = Math.ceil((props.entries.length + 0.1) * barHeight) + margin.top + margin.bottom,
            width = d3.max(props.entries, d => d.consumption) as number;

        const svg = d3
            .select("svg")
            .attr("viewBox", `0 0 ${width} ${height}`);

        const x = d3
            .scaleLinear()
            .domain([0, d3.max(props.entries, d => d.consumption) as number]).nice()
            .range([margin.left, width - margin.right]);

        const y = d3
            .scaleBand<number>()
            .domain(d3.range(props.entries.length)) // .domain(props.data.map(d => d.tag)) ??
            .rangeRound([margin.top, height - margin.bottom])
            .padding(0.1);

        const hoverPanel = d3
            .select("#hover-panel");

        svg
            .select("#bars")
            .attr("fill", COLORS.primary)
            .selectAll("rect")
            .data(props.entries)
            .join("rect")
            .attr("x", x(0))
            .attr("y", (d, i) => y(i) as number)
            .attr("width", d => x(d.consumption) - x(0))
            .attr("height", y.bandwidth())
            .on("mouseover", function (event, d) {
                d3.select(this).attr("fill", COLORS.highlight);
                hoverPanel
                    .html(
                        `<div><strong>Entry: </strong>${d.tag}</div>` +
                        `<div><strong>Consumption: </strong>${d.consumption} kgCO2e</div>` +
                        `<div><strong>Source: </strong>${d.source}</div>` +
                        `<div><strong>Further Info: </strong>${d.further_info}</div>`
                    )
                    .style("visibility", "visible");
            })
            .on("mousemove", function (event) {
                hoverPanel
                    .style("top", event.pageY - 10 + "px")
                    .style("left", event.pageX + 10 + "px");
            })
            .on("mouseout", function () {
                hoverPanel
                    .html(``)
                    .style("visibility", "hidden");
                d3
                    .select(this)
                    .transition()
                    .attr("fill", COLORS.primary);
            });

        (svg
            .select("#x-axis")
            .attr("transform", `translate(0, ${height - margin.bottom})`) as any)
            .call(d3.axisBottom(x).ticks(width / 80, "d"));

        (svg
            .select("#y-axis")
            .attr("transform", `translate(${margin.left}, 0)`) as any)
            .call(d3.axisLeft(y).tickFormat(i => props.entries[i].tag).tickSizeOuter(0));

        svg
            .select("#x-label")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("x", width / 2)
            .attr("y", height)
            .attr("text-anchor", "middle")
            .text("Carbon Emissions (kgCO2e)");

        svg
            .select("#y-label")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("y", 10)
            .attr("transform", `translate(${margin.left - 10},0)`)
            .attr("text-anchor", "end")
            .text("Entries");

    }, [props]);

    return (
        <div>
            <svg width={800} height={600}>
                <g id="bars"/>
                <g id="x-axis"/>
                <g id="y-axis"/>
                <text id="x-label"/>
                <text id="y-label"/>
            </svg>
            <HoverPanel/>
        </div>
    )
}