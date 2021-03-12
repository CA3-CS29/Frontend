import {AccountPortfolios, Office, Portfolio, Region} from "../Interfaces";

export function setOfficeConsumption(office: Office) {
    let consumption = 0;
    for (const entry of office.entries) {
        consumption += entry.consumption;
    }
    office.consumption = consumption;
    return consumption;
}

export function setRegionConsumption(region: Region) {
    let consumption = 0;
    for (const office of region.offices) {
        consumption += setOfficeConsumption(office);
    }
    region.consumption = consumption;
    return consumption;
}

export function setPortfolioConsumption(portfolio: Portfolio) {
    let consumption = 0;
    for (const region of portfolio.regions) {
        consumption += setRegionConsumption(region);
    }
    portfolio.consumption = consumption;
    return consumption;
}

export function setAccountConsumption(account: AccountPortfolios) {
    let consumption = 0;
    for (const portfolio of account.portfolios) {
        consumption += setPortfolioConsumption(portfolio);
    }
    account.consumption = consumption;
    return consumption;
}