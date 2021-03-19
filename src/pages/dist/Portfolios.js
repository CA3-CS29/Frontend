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
var react_router_dom_1 = require("react-router-dom");
var axios_1 = require("axios");
var ApiEndpoints_1 = require("../ApiEndpoints");
var react_bootstrap_1 = require("react-bootstrap");
var App_1 = require("../App");
var Alerts_1 = require("./Alerts");
require("./Portfolios.css");
var pluralize_1 = require("pluralize");
function Portfolios() {
    var user = App_1.useAuthStore(function (state) { return state.user; });
    var _a = react_1.useState([]), alerts = _a[0], setAlerts = _a[1];
    var _b = react_1.useState([]), portfolios = _b[0], setPortfolios = _b[1];
    var _c = react_1.useState(false), portfoliosRetrieved = _c[0], setPortfoliosRetrieved = _c[1];
    var _d = react_1.useState(false), hasWaitedForAPI = _d[0], setHasWaitedForAPI = _d[1];
    var getAllByTagURL = ApiEndpoints_1.ApiEndPoints.getAllPortfolios + (user === null || user === void 0 ? void 0 : user.uid);
    react_1.useEffect(function () {
        setTimeout(function () { return setHasWaitedForAPI(true); }, 2000);
        axios_1["default"].get(getAllByTagURL)
            .then(function (response) {
            var data = response.data;
            console.log(data);
            setPortfolios(data.payload);
            setPortfoliosRetrieved(true);
        })["catch"]((function (error) {
            var errorAlert = { variant: "danger", text: error.toString() };
            setAlerts(function (oldAlerts) { return __spreadArrays(oldAlerts, [errorAlert]); });
            console.log(error);
        }));
    }, [getAllByTagURL]);
    function PortfolioListItems(props) {
        var portfolios = props.portfolios;
        if (portfolios.length !== 0) {
            return react_1["default"].createElement(react_1["default"].Fragment, null, portfolios.map(function (portfolio) { return (react_1["default"].createElement(react_bootstrap_1.ListGroup, { key: portfolio.portfolio_id, className: "mb-1", style: { padding: 5, width: '100%' } },
                react_1["default"].createElement(react_bootstrap_1.ListGroup.Item, { style: {
                        color: colors_1.COLORS.darkText,
                        backgroundColor: "#F7F7F7",
                        borderColor: "#F7F7F7"
                    }, as: react_router_dom_1.Link, to: "portfolio/" + portfolio.tag },
                    react_1["default"].createElement(react_bootstrap_1.Row, null,
                        react_1["default"].createElement(react_bootstrap_1.Col, { style: { textAlign: 'left' } },
                            react_1["default"].createElement("h5", null, portfolio.tag)),
                        react_1["default"].createElement(react_bootstrap_1.Col, { style: { textAlign: 'right' } },
                            react_1["default"].createElement("h5", null,
                                react_1["default"].createElement(react_bootstrap_1.Badge, { style: {
                                        fontFamily: "Lato",
                                        color: colors_1.COLORS.darkText,
                                        fontWeight: "normal",
                                        borderStyle: "solid",
                                        borderWidth: 1
                                    } }, pluralize_1["default"]("Region", portfolio.num_regions, true)))),
                        react_1["default"].createElement(react_bootstrap_1.Button, { className: "DeleteButton mr -1", style: {
                                color: colors_1.COLORS.lightText,
                                fontFamily: "Lato",
                                backgroundColor: "#D91212",
                                borderColor: "#D91212",
                                float: 'right'
                            }, onClick: function () {
                                axios_1["default"]({});
                            } }, "Delete"))))); }));
        }
        else {
            return (react_1["default"].createElement(react_bootstrap_1.Col, null,
                react_1["default"].createElement("h4", { className: "MediumText", style: { color: colors_1.COLORS.darkText, textAlign: "left" } },
                    "There are no portfolios on this account, ",
                    react_1["default"].createElement("br", null),
                    "you can set one up by clicking the Create Portfolio button.")));
        }
    }
    function Body() {
        if (portfoliosRetrieved) {
            return (react_1["default"].createElement(react_bootstrap_1.Container, null,
                react_1["default"].createElement(Alerts_1.AlertViewer, { alerts: alerts, setAlerts: setAlerts }),
                react_1["default"].createElement(react_bootstrap_1.Row, { style: { paddingTop: 10, paddingBottom: 10 } },
                    react_1["default"].createElement(react_bootstrap_1.Col, null,
                        react_1["default"].createElement("h1", { className: "MediumText", style: { color: colors_1.COLORS.darkText, textAlign: "left" } }, "Your Portfolios")),
                    react_1["default"].createElement(react_bootstrap_1.Col, { xs: "auto" },
                        react_1["default"].createElement(react_bootstrap_1.Button, { className: "Button mr-1", style: {
                                color: colors_1.COLORS.darkText,
                                backgroundColor: "#e5e4df",
                                borderColor: "#e5e4df"
                            }, as: react_router_dom_1.Link, to: "/create-portfolio" }, "Create Portfolio"))),
                react_1["default"].createElement(react_bootstrap_1.Row, null,
                    react_1["default"].createElement(react_bootstrap_1.ListGroup, { style: {
                            padding: 5,
                            width: '100%'
                        } },
                        react_1["default"].createElement(PortfolioListItems, { portfolios: portfolios })))));
        }
        else {
            if (hasWaitedForAPI) {
                return (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(react_bootstrap_1.Col, null,
                        react_1["default"].createElement("h4", { className: "MediumText", style: { color: colors_1.COLORS.darkText, textAlign: "left" } },
                            "Loading... ",
                            react_1["default"].createElement("br", null),
                            "If you have any portfolios they will appear soon."))));
            }
            else {
                return (react_1["default"].createElement(react_1["default"].Fragment, null));
            }
        }
    }
    return (react_1["default"].createElement(react_bootstrap_1.Container, { fluid: true, className: "Landing overflow-auto", style: {
            padding: 0,
            backgroundColor: colors_1.COLORS.background
        } },
        react_1["default"].createElement(Body, null),
        react_1["default"].createElement("br", null)));
}
exports["default"] = Portfolios;
