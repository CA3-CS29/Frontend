export interface Entry {
    entry_id: string,
    office_id: string,
    tag: string,
    consumption: number,
    source: string,
    further_info: string,
}

export interface Office {
    name: string,
    office_id: string,
    region_id: string,
    user_id: string,
    consumption: number,
    num_entries: number
    entries: Entry[],
}

export interface Region {
    name: string,
    region_id: string,
    portfolio_id: string,
    user_id: string,
    consumption: number,
    num_offices: number,
    offices: Office[],
}

export interface Portfolio {
    tag: string,
    portfolio_id: string,
    user_id: string,
    created_on: string,
    updated_on: string,
    consumption: number,
    num_regions: number,
    regions: Region[],
}

export interface AccountPortfolios {
    name: string,
    consumption: number,
    portfolios: Portfolio[],
}