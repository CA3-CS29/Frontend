const baseUrl = "https://ca3-api.herokuapp.com/";
const cs30Url = "https://cs30.herokuapp.com/api/carbon";

export const ApiEndPoints = {
    createAccount: baseUrl + "account/createAccount/",
    deleteAccount: baseUrl + "account/delete/",
    createPortfolio: baseUrl + "portfolio/createPortfolio/",
    getPortfolio: baseUrl + "portfolio/getPortfolio/",
    getAllPortfolios: baseUrl + "portfolio/getAllByUserId/",
    createRegion: baseUrl + "region/createRegion/",
    getAllRegionsForUser: baseUrl + "region/getAllRegionsForUser/",
    createOffice: baseUrl + "office/createOffice/",
    createEntry: baseUrl + "entry/createEntry/",
    deleteEntry: baseUrl + "entry/delete/",
    deleteOffice: baseUrl + "office/delete/",
    deleteRegion: baseUrl + "region/delete/",
    deletePortfolio: baseUrl + "portfolio/delete/",

    getAllCarbonVals: cs30Url,
    getScopes: cs30Url + "/scope",
    getItemInfo: cs30Url + "/info",

};
