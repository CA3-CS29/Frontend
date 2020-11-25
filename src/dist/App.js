"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./App.css");
var colors_1 = require("./colors");
var react_router_dom_1 = require("react-router-dom");
var Header_1 = require("./Pages/Header");
var Landing_1 = require("./Pages/Landing");
var About_1 = require("./Pages/About");
var Login_1 = require("./Pages/Login");
var Signup_1 = require("./Pages/Signup");
function App() {
    return (react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
        react_1["default"].createElement("div", { className: "App", style: {
                color: colors_1.COLORS.darkText,
                backgroundColor: "white"
            } },
            react_1["default"].createElement(Header_1["default"], { logoText: "CA3" }),
            react_1["default"].createElement(react_router_dom_1.Switch, null,
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/", exact: true, component: Landing_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/about", exact: true, component: About_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/login", exact: true, component: Login_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/signup", exact: true, component: Signup_1["default"] }))),
        react_1["default"].createElement("div", null, "Login")));
}
exports["default"] = App;
