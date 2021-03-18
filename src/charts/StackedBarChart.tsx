import React, {useEffect} from 'react';
import * as d3 from 'd3';

import {colourScheme30} from '../colors';
import HoverPanel, {updateHoverPanel} from "./HoverPanel";
import {AccountPortfolios, Entry, Office, Portfolio, Region} from "../Interfaces";
import {setAccountConsumption, setPortfolioConsumption, setRegionConsumption} from "./SetConsumption";


export default function StackedBarChart(props: { data: AccountPortfolios | Portfolio | Region }) {
    useEffect(() => {
        let bars: (Portfolio | Region | Office)[];
        let blocks: (Region | Office | Entry)[] = [];

        if ("portfolios" in props.data) {
            setAccountConsumption(props.data);
            bars = props.data.portfolios;
            for (const portfolio of props.data.portfolios) {
                blocks = [...blocks, ...portfolio.regions];
            }
        } else if ("regions" in props.data) {
            setPortfolioConsumption(props.data);
            bars = props.data.regions;
            for (const region of props.data.regions) {
                blocks = [...blocks, ...region.offices];
            }
        } else {
            setRegionConsumption(props.data);
            bars = props.data.offices;
            for (const office of props.data.offices) {
                blocks = [...blocks, ...office.entries];
            }
        }

        const margin = {top: 15, right: 20, bottom: 40, left: 80},
            barHeight = 25,
            height = Math.ceil((bars.length + 0.1) * barHeight) + margin.top + margin.bottom,
            width = 800,
            maxConsumption = d3.max(bars, d => d.consumption) as number;

        const colour = d3.scaleOrdinal(
            blocks.map(block => "entry_id" in block ? block.tag : block.name),
            colourScheme30
        )

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
            .domain(d3.range(bars.length))
            .rangeRound([margin.top, height - margin.bottom])
            .padding(0.1);

        const hoverPanel = d3
            .select("#hover-panel");

        let currentBar: number = -1;
        let currentCumulativeConsumption: number = 0;

        svg
            .select("#bars")

            .selectAll(".bar")
            .data(bars)
            .join("g")
            .attr("class", "bar")

            .selectAll("rect")
            .data<Portfolio | Region | Office | Entry>(
                data => "regions" in data ? data.regions : "offices" in data ? data.offices : data.entries
            )
            .join("rect")
            .attr("x", (datum, i) => {
                if (i === 0) {
                    currentCumulativeConsumption = datum.consumption;
                } else {
                    currentCumulativeConsumption += datum.consumption;
                }
                return x(currentCumulativeConsumption - datum.consumption);
            })
            .attr("y", (_datum, i) => y(i ? currentBar : ++currentBar) as number)
            .attr("width", datum => x(datum.consumption) - x(0))
            .attr("height", y.bandwidth())
            .attr("fill", datum => colour("tag" in datum ? datum.tag : datum.name))
            .on("mouseover", function (_event, datum) {
                d3.select(this)
                    .attr("fill", () =>
                        d3.rgb(colour("tag" in datum ? datum.tag : datum.name)).brighter(0.5).toString());
                hoverPanel
                    .html(updateHoverPanel(datum))
                    .style("visibility", "visible");
            })
            .on("mousemove", function (event) {
                hoverPanel
                    .style("top", event.pageY - 10 + "px")
                    .style("left", event.pageX + 10 + "px");
            })
            .on("mouseout", function (_event, datum) {
                hoverPanel
                    .html(``)
                    .style("visibility", "hidden");
                d3
                    .select(this)
                    .transition()
                    .attr("fill", colour("tag" in datum ? datum.tag : datum.name));
            });

        (svg
            .select("#x-axis")
            .attr("transform", `translate(0, ${height - margin.bottom})`) as any)
            .call(
                d3.axisBottom(x).ticks(10, "d")
            );

        (svg
            .select("#y-axis")
            .attr("transform", `translate(${margin.left}, 0)`) as any)
            .call(
                d3.axisLeft(y)
                    .tickFormat(i => {
                        const bar = bars[i];
                        return "regions" in bar ? bar.tag : bar.name;
                    })
                    .tickSizeOuter(0)
            )
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
            .text(bars ? "regions" in bars[0] ? "Portfolios" : "offices" in bars[0] ? "Regions" : "Offices" : "");
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