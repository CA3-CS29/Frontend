import React from 'react';

import {COLORS} from '../colors';
import {AccountPortfolios, Entry, Office, Portfolio, Region} from "../Interfaces";


export default function HoverPanel() {
    return <div
        id="hover-panel"
        style={{
            position: "fixed",
            zIndex: 10,
            visibility: "hidden",
            padding: "10px",
            backgroundColor: COLORS.accent,
            borderRadius: "5px",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)",
            color: COLORS.darkText,
            fontFamily: "Lato",
            textAlign: "left",
        }}/>
}

export function updateHoverPanel(datum: AccountPortfolios | Portfolio | Region | Office | Entry) {
        if ("portfolios" in datum) {
                return `<div><strong>Account:</strong> ${datum.name}</div>` +
                    `<div><strong>Consumption:</strong> ${datum.consumption} kgCO2e</div>`
        } else if ("regions" in datum) {
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