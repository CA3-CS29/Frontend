import React, {useEffect} from 'react';
import * as d3 from 'd3';

import {COLORS} from '../colors';
import HoverPanel from "./HoverPanel";
import {Entry} from "../Interfaces";


export default function BubbleChart(props: { entries: Entry[] }) {
    useEffect(() => {
        const height = 600, width = 800;

        const root = d3
            .pack()
            .size([width - 2, height - 2])
            .padding(3)
            (d3.hierarchy({children: props.entries, consumption: 0})
                .sum(d => d.consumption))

        const colour = d3.scaleOrdinal(props.entries.map(d => d.source), d3.schemeCategory10)

        const hoverPanel = d3
            .select("#hover-panel");

        d3
            .select("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .selectAll("circle")
            .data(root.leaves())
            .join("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", d => d.r)
            .attr("fill", (d: any) => colour(d.data.source))
            .attr("stroke-width", 2)
            .on("mouseover", function (_event, d: any) {
                d3.select(this).attr("stroke", COLORS.darkText);
                hoverPanel.html(
                    `<div><strong>Entry: </strong>${d.data.tag}</div>` +
                    `<div><strong>Consumption: </strong>${d.data.consumption} kgCO2e</div>` +
                    `<div><strong>Source: </strong>${d.data.source}</div>` +
                    `<div><strong>Further Info: </strong>${d.data.further_info}</div>`
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
                    .attr("stroke", null);
            });

    }, [props]);

    return (
        <div>
            <svg width={800} height={600}/>
            <HoverPanel/>
        </div>
    )
}