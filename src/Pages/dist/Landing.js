"use strict";
exports.__esModule = true;
var react_1 = require("react");
var colors_1 = require("../colors");
require("./Landing.css");
var Container_1 = require("react-bootstrap/Container");
var Row_1 = require("react-bootstrap/Row");
var react_router_dom_1 = require("react-router-dom");
var Button_1 = require("react-bootstrap/Button");
function Landing() {
    return (react_1["default"].createElement("div", { className: "Landing", style: {
            backgroundColor: colors_1.COLORS.accent
        } },
        react_1["default"].createElement(Button_1["default"], { style: {
                color: colors_1.COLORS.darkText,
                backgroundColor: colors_1.COLORS.highlight,
                fontFamily: 'Lato',
                fontWeight: 'lighter',
                fontSize: 25,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                display: "inline",
                position: "absolute",
                top: 400,
                left: 200
            }, as: react_router_dom_1.Link, to: "/login" }, "Log in"),
        react_1["default"].createElement(Button_1["default"], { style: {
                color: colors_1.COLORS.darkText,
                backgroundColor: colors_1.COLORS.secondaryAccent,
                fontFamily: 'Lato',
                fontWeight: 'lighter',
                fontSize: 25,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                display: "inline",
                position: "absolute",
                top: 400,
                left: 300
            }, as: react_router_dom_1.Link, to: "/signup" }, "Sign up"),
        react_1["default"].createElement(Container_1["default"], null,
            react_1["default"].createElement(Row_1["default"], null,
                react_1["default"].createElement("h1", { className: "bigText", style: {
                        color: colors_1.COLORS.darkText
                    } }, "Carbon Analysis 3")),
            react_1["default"].createElement(Row_1["default"], null,
                react_1["default"].createElement("p", { className: "smallText", style: {
                        color: colors_1.COLORS.darkText
                    } }, "Carbon emission calculations and visualisations made easy.")))));
}
exports["default"] = Landing;
