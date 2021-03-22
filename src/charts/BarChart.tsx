import React, {useEffect} from 'react';
import * as d3 from 'd3';

import {COLORS} from '../colors';
import HoverPanel from "./HoverPanel";
import {Entry} from "../Interfaces";


export default function BarChart(props: { entries: Entry[] }) {
    useEffect(() => {
        const margin = {top: 15, right: 20, bottom: 40, left: 80},
            barHeight = 25,
            height = Math.ceil((props.entries.length + 0.1) * barHeight) + margin.top + margin.bottom,
            width = 800,
            maxConsumption = d3.max(props.entries, d => d.consumption) as number;

        const svg = d3
            .select("svg")
            .attr("viewBox", `0 0 ${width} ${height}`);

        const x = d3
            .scaleLinear()
            .domain([0, maxConsumption])
            .nice()
            .range([margin.left, width - margin.right]);

        const y = d3
            .scaleBand<number>()
            .domain(d3.range(props.entries.length))
            .rangeRound([margin.top, height - margin.bottom])
            .padding(0.1);

        const hoverPanel = d3
            .select("#hover-panel");

        svg
            .select("#bars")
            .attr("fill", COLORS.visualiseGreen)
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
                    .attr("fill", COLORS.visualiseGreen);
            });

        (svg
            .select("#x-axis")
            .attr("transform", `translate(0, ${height - margin.bottom})`) as any)
            .call(d3.axisBottom(x).ticks(10, "d"));

        (svg
            .select("#y-axis")
            .attr("transform", `translate(${margin.left}, 0)`) as any)
            .call(d3.axisLeft(y).tickFormat(i => props.entries[i].tag).tickSizeOuter(0))
            .attr("font-family", "Lato");

        svg
            .select("#x-label")
            .attr("font-family", "Lato")
            .attr("font-size", 14)
            .attr("x", width / 2)
            .attr("y", height - 5)
            .attr("text-anchor", "middle")
            .text("Carbon Emissions (kgCO2e)");

        svg
            .select("#y-label")
            .attr("font-family", "Lato")
            .attr("font-size", 14)
            .attr("y", 12)
            .attr("transform", `translate(${margin.left - 10},0)`)
            .attr("text-anchor", "end")
            .text("Entries");

    }, [props]);

    return (
        <div style={{height: "70vh", overflow: "auto"}}>
            <svg width="90vw">
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