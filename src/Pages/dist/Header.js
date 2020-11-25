"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../App.css");
var colors_1 = require("../colors");
var react_router_dom_1 = require("react-router-dom");
require("bootstrap/dist/css/bootstrap.min.css");
var Navbar_1 = require("react-bootstrap/Navbar");
var Nav_1 = require("react-bootstrap/Nav");
var Button_1 = require("react-bootstrap/Button");
function Header(props) {
    return (react_1["default"].createElement(Navbar_1["default"], { style: {
            backgroundColor: colors_1.COLORS.primary,
            color: colors_1.COLORS.lightText,
            fontFamily: 'Lato',
            height: 45
        }, className: "Header" },
        react_1["default"].createElement(Nav_1["default"], { className: "mr-auto" },
            react_1["default"].createElement(Navbar_1["default"].Brand, { style: {
                    color: colors_1.COLORS.lightText,
                    fontFamily: 'Lato',
                    fontWeight: 'lighter',
                    fontSize: 40
                }, as: react_router_dom_1.Link, to: "/" }, props.logoText)),
        react_1["default"].createElement(Button_1["default"], { style: {
                color: colors_1.COLORS.darkText,
                backgroundColor: colors_1.COLORS.highlight,
                fontFamily: 'Lato',
                fontWeight: 'lighter',
                fontSize: 25,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                display: "flex"
            }, as: react_router_dom_1.Link, to: "/about" }, "About")));
}
exports["default"] = Header;
