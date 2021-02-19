const baseUrl = "https://ca3-api.herokuapp.com/";

export const ApiEndPoints = {
    createAccount: baseUrl + "account/createAccount/",
    deleteAccount: baseUrl + "account/delete/",
    createPortfolio: baseUrl + "portfolio/createPortfolio/",
    getPortfolio: baseUrl + "portfolio/getPortfolio/",
    getAllPortfolios: baseUrl +"portfolio/getAllByUserId/",
    createRegion: baseUrl + "region/createRegion/",
    getAllRegionsForUser: baseUrl + "region/getAllRegionsForUser/",
    createOffice: baseUrl + "office/createOffice/",
    createEntry: baseUrl + "entry/createEntry/",
};
