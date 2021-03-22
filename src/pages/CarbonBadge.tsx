import React from 'react';
import { COLORS } from '../colors';
import '../App.css';
import './Portfolio.css';
import { Badge } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

import { AccountPortfolios, Entry, Office, Portfolio, Region } from "../Interfaces";



export default function CarbonBadge(props: { data: AccountPortfolios | Portfolio | Region | Office} ) {
    const data = props.data;

    function getEntriesFromRegion(region: Region) {
        let entries: Entry[] = [];
        for (const office of region.offices) {
            if (office.entries) {
                entries = [...entries, ...office.entries];
            }
        }
        return entries;
    }

    function getEntriesFromPortfolio(portfolio: Portfolio) {
        let entries: Entry[] = [];
        for (const region of portfolio.regions) {
            entries = [...entries, ...getEntriesFromRegion(region)];
        }
        return entries;
    }

    function getEntriesFromAccount(account: AccountPortfolios) {
        let entries: Entry[] = [];
        for (const portfolio of account.portfolios) {
            entries = [...entries, ...getEntriesFromPortfolio(portfolio)];
        }
        return entries;
    }

    let entries: Entry[];
    if ("portfolios" in data) {
        entries = getEntriesFromAccount(data);
    } else if ("regions" in data) {
        entries = getEntriesFromPortfolio(data);
    } else if ("offices" in data) {
        entries = getEntriesFromRegion(data);
    } else {
        entries = data.entries;
    }
    console.log(entries)


    let totalCarbonCost = Math.round(entries.reduce(function (acc, entry) { return acc + entry.consumption; }, 0))


    return(
        <Badge
            style={{
                color: COLORS.darkText,
                fontWeight: "normal",
                borderStyle: "solid",
                borderWidth: 1,
                marginLeft: 10,
            }}
        >
            {totalCarbonCost} kgCO2e
        </Badge>
    )

}