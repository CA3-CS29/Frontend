import React, {useEffect} from 'react';
import * as d3 from 'd3';
import HoverPanel from "./HoverPanel";
import {AccountPortfolios, Entry, Office, Portfolio, Region} from "../Interfaces";
import {setAccountConsumption, setPortfolioConsumption, setRegionConsumption} from "./SetConsumption";
import {COLORS} from "../colors";


export default function HierarchicalBubbleChart(props: { data: AccountPortfolios | Portfolio | Region }) {

    const height = 600, width = 600;

    if ("portfolios" in props.data) {
        setAccountConsumption(props.data);
    } else if ("regions" in props.data) {
        setPortfolioConsumption(props.data);
    } else {
        setRegionConsumption(props.data);
    }

    useEffect(() => {
        const root = d3
            .pack()
            .size([width - 2, height - 2])
            .padding(3)
            (
                d3.hierarchy(
                    props.data as AccountPortfolios | Portfolio | Region | Office | Entry,
                    (datum) => {
                        if ("portfolios" in datum) {
                            return datum.portfolios;
                        } else if ("regions" in datum) {
                            return datum.regions;
                        } else if ("offices" in datum) {
                            return datum.offices;
                        } else if ("entries" in datum) {
                            return datum.entries;
                        } else {
                            return null;
                        }
                    }
                )
                    .sum(datum => datum.consumption)
                    .sort((a, b) => b.data.consumption - a.data.consumption)
            )

        let focus = root;

        const colour = d3.scaleSequential([5, -1], d3.interpolateGreens);

        const hoverPanel = d3
            .select("#hover-panel");

        const svg = d3
            .select("svg")
            .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
            .style("background", colour(0))
            .on("click", (event) => {
                focus = transitionZoom(event, root)
            })
            .on("mouseover", function () {
                d3
                    .select(this)
                    .style("background", d3.rgb(colour(0)).brighter(0.5).toString());
                hoverPanel
                    .html(updateBackgroundHoverPanel())
                    .style("visibility", "visible");
            })
            .on("mousemove", function (event) {
                hoverPanel
                    .style("top", event.pageY + 10 + "px")
                    .style("left", event.pageX + 20 + "px");
            })
            .on("mouseout", function () {
                d3
                    .select(this)
                    .transition()
                    .style("background", colour(0));
                hoverPanel
                    .html(``)
                    .style("visibility", "hidden");
            });

        const bubbles = svg
            .selectAll("circle")
            .data(root.descendants().slice(1))
            .join("circle")
            .style("fill", node => colour(node.depth))
            .on("mouseover", function (event, node: any) {
                d3
                    .select(this)
                    .style("fill", (node: any) =>
                        d3.rgb(colour(node.depth)).brighter(0.5).toString());
                hoverPanel
                    .html(updateCircleHoverPanel(node.data))
                    .style("visibility", "visible");
                event.stopPropagation();
            })
            .on("mousemove", function (event) {
                hoverPanel
                    .style("top", event.pageY + 10 + "px")
                    .style("left", event.pageX + 20 + "px");
            })
            .on("mouseout", function (event) {
                hoverPanel
                    .html(``)
                    .style("visibility", "hidden");
                d3
                    .select(this)
                    .transition()
                    .style("fill", (node: any) => colour(node.depth));
                event.stopPropagation();
            })
            .on("click", function (event, node) {
                if (focus !== node) {
                    focus = transitionZoom(event, node);
                    event.stopPropagation();
                }
            });

        let view = zoom([root.x, root.y, root.r * 2]);

        function zoom(target: [number, number, number]) {
            const k = (width < height ? width : height) / target[2];
            bubbles
                .attr("transform", (node: any) =>
                    `translate(${(node.x - target[0]) * k}, ${(node.y - target[1]) * k})`)
                .attr("r", (node: any) => node.r * k);
            return target;
        }

        function transitionZoom(event: any, node: any) {
            svg
                .transition()
                .duration(500)
                .tween("zoom", () => {
                    const interpolator = d3.interpolateZoom(view, [node.x, node.y, node.r * 2]);
                    return (t: number) => {
                        view = zoom(interpolator(t));
                    };
                });
            return node;
        }

        function updateCircleHoverPanel(datum: Portfolio | Region | Office | Entry) {
            if ("regions" in datum) {
                return `<div><strong>Portfolio:</strong> ${datum.tag}</div>` +
                    `<div><strong>Consumption:</strong> ${datum.consumption} kgCO2e</div>`
            } else if ("offices" in datum) {
                return `<div><strong>Region:</strong> ${datum.name}</div>` +
                    `<div><strong>Consumption:</strong> ${datum.consumption} kgCO2e</div>`
            } else if ("entries" in datum) {
                return `<div><strong>Office:</strong> ${datum.name}</div>` +
                    `<div><strong>Consumption:</strong> ${datum.consumption} kgCO2e</div>`
            } else {
                return `<div><strong>Entry:</strong> ${datum.tag}</div>` +
                    `<div><strong>Consumption:</strong> ${datum.consumption} kgCO2e</div>` +
                    `<div><strong>Source:</strong> ${datum.source}</div>` +
                    `<div><strong>Further Info:</strong> ${datum.further_info}</div>`
            }
        }

        function updateBackgroundHoverPanel() {
            if ("portfolios" in props.data) {
                return `<div><strong>Account:</strong> ${props.data.name}</div>` +
                    `<div><strong>Consumption:</strong> ${props.data.consumption} kgCO2e</div>`
            } else if ("regions" in props.data) {
                return `<div><strong>Portfolio:</strong> ${props.data.tag}</div>` +
                    `<div><strong>Consumption:</strong> ${props.data.consumption} kgCO2e</div>`
            } else {
                return `<div><strong>Region:</strong> ${props.data.name}</div>` +
                    `<div><strong>Consumption:</strong> ${props.data.consumption} kgCO2e</div>`
            }
        }
    }, [props.data]);

    return (
        <>
            <svg
                height="70vh"
                width="90vw"
                style={{
                    borderStyle: "solid",
                    borderColor: COLORS.accent,
                    borderWidth: 1,
                    borderRadius: 5,
                }}
            />
            <HoverPanel/>
        </>
    )
}