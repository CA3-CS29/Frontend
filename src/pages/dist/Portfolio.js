"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var colors_1 = require("../colors");
require("../App.css");
require("./Portfolio.css");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = require("axios");
var ApiEndpoints_1 = require("../ApiEndpoints");
var react_bootstrap_1 = require("react-bootstrap");
var Alerts_1 = require("./Alerts");
var pluralize_1 = require("pluralize");
require("bootstrap/dist/css/bootstrap.min.css");
var AddEntry_1 = require("./AddEntry");
var AddRegion_1 = require("./AddRegion");
var AddOffice_1 = require("./AddOffice");
var App_1 = require("../App");
function Portfolio(props) {
    var user = App_1.useAuthStore(function (state) { return state.user; });
    var _a = react_1.useState(false), dataRetrieved = _a[0], setDataRetrieved = _a[1];
    var tag = props.match.params.tag;
    var _b = react_1.useState(""), status = _b[0], setStatus = _b[1];
    var _c = react_1.useState(""), portfolioID = _c[0], setPortfolioID = _c[1];
    var _d = react_1.useState(0), numRegions = _d[0], setNumRegions = _d[1];
    var _e = react_1.useState([]), regions = _e[0], setRegions = _e[1];
    var _f = react_1.useState([]), alerts = _f[0], setAlerts = _f[1];
    var getPortfolioURL = ApiEndpoints_1.ApiEndPoints.getPortfolio + tag + "/" + (user === null || user === void 0 ? void 0 : user.uid);
    function getPortfolio() {
        setDataRetrieved(false);
        console.log("Getting portfolio:", getPortfolioURL);
        axios_1["default"].get(getPortfolioURL)
            .then(function (response) {
            var data = response.data;
            console.log(data);
            setStatus(data.status);
            if (data.payload) {
                setPortfolioID(data.payload.portfolio_id);
                setNumRegions(data.payload.num_regions);
                setRegions(data.payload.regions);
            }
            else {
                var noPortfolioAlert_1 = {
                    variant: "danger",
                    text: "There is no portfolio named \"" + tag + "\""
                };
                setAlerts(function (oldAlerts) { return __spreadArrays(oldAlerts, [noPortfolioAlert_1]); });
            }
            setDataRetrieved(true);
        })["catch"](function (error) {
            var errorAlert = { variant: "danger", text: error.toString() };
            setAlerts(function (oldAlerts) { return __spreadArrays(oldAlerts, [errorAlert]); });
            console.log(error);
        });
    }
    react_1.useEffect(getPortfolio, [getPortfolioURL, tag]);
    // const deleteRegion
    function RegionListItems(props) {
        var regions = props.regions;
        return react_1["default"].createElement(react_1["default"].Fragment, null, regions.map(function (region) {
            return react_1["default"].createElement(react_bootstrap_1.Card, { key: region.region_id },
                react_1["default"].createElement(react_bootstrap_1.Card.Header, { style: { paddingTop: 0, paddingBottom: 0 } },
                    react_1["default"].createElement(react_bootstrap_1.Row, null,
                        react_1["default"].createElement(react_bootstrap_1.Accordion.Toggle, { as: react_bootstrap_1.Col, eventKey: region.region_id, style: { cursor: "pointer", textAlign: "left", paddingTop: 12, paddingBottom: 12 } },
                            react_1["default"].createElement("h4", null,
                                region.name,
                                react_1["default"].createElement(react_bootstrap_1.Badge, { style: {
                                        fontFamily: "Lato",
                                        color: colors_1.COLORS.darkText,
                                        fontWeight: "normal",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        marginLeft: 10
                                    } }, pluralize_1["default"]("Office", region.num_offices, true))),
                            region.region_id),
                        react_1["default"].createElement(react_bootstrap_1.Accordion.Collapse, { eventKey: region.region_id },
                            react_1["default"].createElement(react_bootstrap_1.Col, { xs: "auto", style: { paddingTop: 12, paddingBottom: 12 } },
                                react_1["default"].createElement(AddOffice_1["default"], { accountID: user.uid, portfolioID: portfolioID, regionID: region.region_id, setAlerts: setAlerts, onSuccess: getPortfolio }),
                                react_1["default"].createElement(react_bootstrap_1.Button, { className: "DeleteButton mr-1 mt-1", style: {
                                        color: colors_1.COLORS.lightText,
                                        fontFamily: "Lato",
                                        backgroundColor: "#D91212",
                                        borderColor: "#D91212",
                                        float: 'right'
                                    }, onClick: function () {
                                        axios_1["default"]({
                                            method: 'delete',
                                            url: ApiEndpoints_1.ApiEndPoints.deleteRegion +
                                                region.region_id + "/" +
                                                region.portfolio_id + "/" +
                                                tag + "/" + (user === null || user === void 0 ? void 0 : user.uid)
                                        });
                                    } }, "Delete"),
                                react_1["default"].createElement(react_bootstrap_1.Button, { className: "Button mr-1 mt-1", style: {
                                        color: colors_1.COLORS.darkText,
                                        backgroundColor: "#ccf9ce",
                                        borderColor: "#ccf9ce",
                                        float: 'right'
                                    }, as: react_router_dom_1.Link, to: {
                                        pathname: "/visualise-region",
                                        state: { region: region }
                                    } }, "Visualise"))))),
                react_1["default"].createElement(react_bootstrap_1.Accordion.Collapse, { eventKey: region.region_id },
                    react_1["default"].createElement(react_bootstrap_1.Card.Body, { style: { padding: 5 } },
                        react_1["default"].createElement(react_bootstrap_1.Col, null),
                        react_1["default"].createElement(react_bootstrap_1.Accordion, { style: { width: '100%' } },
                            react_1["default"].createElement(OfficeListItems, { region: region })))));
        }));
    }
    function OfficeListItems(props) {
        var offices = props.region.offices;
        var region = props.region;
        if (offices && offices.length > 0) {
            var mappedOffices = offices.map(function (office) {
                return react_1["default"].createElement(react_bootstrap_1.ListGroup.Item, { key: office.office_id, style: { paddingTop: 0 } },
                    react_1["default"].createElement(react_bootstrap_1.Row, null,
                        react_1["default"].createElement(react_bootstrap_1.Accordion.Toggle, { as: react_bootstrap_1.Col, eventKey: office.office_id, style: { cursor: "pointer", textAlign: "left", paddingTop: 12 } },
                            react_1["default"].createElement("h5", { style: { textAlign: "left" } },
                                office.name,
                                react_1["default"].createElement(react_bootstrap_1.Badge, { style: {
                                        fontFamily: "Lato",
                                        color: colors_1.COLORS.darkText,
                                        fontWeight: "normal",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        marginLeft: 10
                                    } }, pluralize_1["default"]("Entry", office.num_entries, true)))),
                        react_1["default"].createElement(react_bootstrap_1.Accordion.Collapse, { eventKey: office.office_id },
                            react_1["default"].createElement(react_bootstrap_1.Col, { xs: "auto" },
                                react_1["default"].createElement(AddEntry_1["default"], { accountID: user.uid, portfolioID: portfolioID, regionID: region.region_id, officeID: office.office_id, officeTag: office.name, setAlerts: setAlerts, onSuccess: getPortfolio }),
                                react_1["default"].createElement(react_bootstrap_1.Button, { className: "DeleteButton mr-1", style: {
                                        color: colors_1.COLORS.lightText,
                                        fontFamily: "Lato",
                                        backgroundColor: "#D91212",
                                        borderColor: "#D91212",
                                        float: 'right'
                                    }, onClick: function () {
                                        axios_1["default"]({
                                            method: 'delete',
                                            url: ApiEndpoints_1.ApiEndPoints.deleteOffice +
                                                office.office_id + "/" +
                                                region.region_id + "/" +
                                                region.name + "/" +
                                                region.portfolio_id + "/" +
                                                tag + "/" + (user === null || user === void 0 ? void 0 : user.uid)
                                        });
                                    } }, "Delete"),
                                react_1["default"].createElement(react_bootstrap_1.Button, { className: "Button mr-1", style: {
                                        color: colors_1.COLORS.darkText,
                                        backgroundColor: "#ccf9ce",
                                        borderColor: "#ccf9ce",
                                        float: "right"
                                    }, as: react_router_dom_1.Link, to: {
                                        pathname: "/visualise-office",
                                        state: { office: office }
                                    } }, "Visualise")))),
                    react_1["default"].createElement(react_bootstrap_1.Accordion.Collapse, { eventKey: office.office_id },
                        react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement("hr", null),
                            react_1["default"].createElement(EntryListItems, { office: office, region: region }))));
            });
            return react_1["default"].createElement(react_bootstrap_1.ListGroup, { variant: "flush" }, mappedOffices);
        }
        else {
            return react_1["default"].createElement(react_1["default"].Fragment, null, "No office here just yet");
        }
    }
    function EntryListItems(props) {
        // axios({
        //     method: 'delete',
        //     url: ApiEndPoints.deleteEntry +
        //         entry.entry_id + "/" +
        //         entry.office_id + "/" +
        //         props.office.name + "/" +
        //         props.office.region_id + "/" +
        //         region.name + "/" +
        //         region.portfolio_id + "/" +
        //         tag + "/" +
        //         user?.uid,
        // });
        if (props.office.entries && props.office.entries.length > 0) {
            var mappedEntries = props.office.entries.map(function (entry) {
                return react_1["default"].createElement("tr", { key: entry.entry_id },
                    react_1["default"].createElement("td", null, entry.tag),
                    react_1["default"].createElement("td", null, entry.consumption),
                    react_1["default"].createElement("td", null, entry.source),
                    react_1["default"].createElement("td", null, entry.further_info),
                    react_1["default"].createElement(react_bootstrap_1.Button, { className: "DeleteButton mr -1", style: {
                            color: colors_1.COLORS.lightText,
                            fontFamily: "Lato",
                            backgroundColor: "#D91212",
                            borderColor: "#D91212",
                            float: 'right'
                        }, onClick: function () {
                            axios_1["default"]({});
                        } }, "Delete"));
            });
            return (react_1["default"].createElement(react_bootstrap_1.Table, { hover: true, borderless: true, responsive: true },
                react_1["default"].createElement("thead", null,
                    react_1["default"].createElement("tr", null,
                        react_1["default"].createElement("th", null, "Entry"),
                        react_1["default"].createElement("th", null, "Consumption (kgCO2e)"),
                        react_1["default"].createElement("th", null, "Source"),
                        react_1["default"].createElement("th", null, "Further Information"))),
                react_1["default"].createElement("tbody", null, mappedEntries)));
        }
        else {
            return react_1["default"].createElement(react_1["default"].Fragment, null, "No entries in this office yet");
        }
    }
    function Body() {
        if (dataRetrieved) {
            return (react_1["default"].createElement(react_bootstrap_1.Container, null,
                react_1["default"].createElement(Alerts_1.AlertViewer, { alerts: alerts, setAlerts: setAlerts }),
                react_1["default"].createElement(react_bootstrap_1.Row, { style: { paddingTop: 10, paddingBottom: 10 } },
                    react_1["default"].createElement(react_bootstrap_1.Col, null,
                        react_1["default"].createElement("h1", { className: "MediumText", style: { color: colors_1.COLORS.darkText, textAlign: "left" } }, tag)),
                    react_1["default"].createElement(react_bootstrap_1.Col, { xs: "auto" },
                        react_1["default"].createElement(AddRegion_1["default"], { accountID: user.uid, portfolioID: portfolioID, setAlerts: setAlerts, onSuccess: getPortfolio }),
                        react_1["default"].createElement(react_bootstrap_1.Button, { className: "DeleteButton mr-1 mt-1", style: {
                                color: colors_1.COLORS.lightText,
                                fontFamily: "Lato",
                                backgroundColor: "#D91212",
                                borderColor: "#D91212",
                                float: 'right'
                            }, onClick: function () {
                                axios_1["default"]({
                                    method: 'delete',
                                    url: ApiEndpoints_1.ApiEndPoints.deletePortfolio +
                                        portfolioID + "/" + (user === null || user === void 0 ? void 0 : user.uid)
                                });
                            } }, "Delete"),
                        react_1["default"].createElement(react_bootstrap_1.Button, { className: "Button mr-1 mt-1", style: {
                                color: colors_1.COLORS.darkText,
                                backgroundColor: "#ccf9ce",
                                borderColor: "#ccf9ce",
                                float: 'right'
                            } }, "Visualise"))),
                react_1["default"].createElement(react_bootstrap_1.Row, null,
                    react_1["default"].createElement(react_bootstrap_1.Card, { style: {
                            padding: 21,
                            marginBottom: 20,
                            width: '100%',
                            textAlign: "left"
                        } },
                        "This is a paragraph about the portfolio",
                        react_1["default"].createElement("br", null),
                        "Status: ",
                        status,
                        react_1["default"].createElement("br", null),
                        "Portfolio ID: ",
                        portfolioID,
                        react_1["default"].createElement("br", null),
                        "Number of regions: ",
                        numRegions,
                        react_1["default"].createElement("br", null))),
                react_1["default"].createElement(react_bootstrap_1.Row, null,
                    react_1["default"].createElement(react_bootstrap_1.Accordion, { style: { width: '100%' } },
                        react_1["default"].createElement(RegionListItems, { regions: regions })))));
        }
        else {
            return (react_1["default"].createElement(react_1["default"].Fragment, null));
        }
    }
    return (react_1["default"].createElement(react_bootstrap_1.Container, { fluid: true, className: "overflow-auto", style: {
            padding: 0,
            backgroundColor: colors_1.COLORS.background
        } },
        react_1["default"].createElement(Body, null),
        react_1["default"].createElement("br", null)));
}
exports["default"] = Portfolio;
