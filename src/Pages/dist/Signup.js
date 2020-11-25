"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../App.css");
var colors_1 = require("../colors");
var Container_1 = require("react-bootstrap/Container");
var Row_1 = require("react-bootstrap/Row");
var react_router_dom_1 = require("react-router-dom");
var Button_1 = require("react-bootstrap/Button");
var react_bootstrap_1 = require("react-bootstrap");
function SignUp() {
    return (react_1["default"].createElement("div", { className: "Landing", style: {
            backgroundColor: colors_1.COLORS.accent
        } },
        react_1["default"].createElement(Container_1["default"], null,
            react_1["default"].createElement(Row_1["default"], null,
                react_1["default"].createElement("h1", { className: "bigText", style: {
                        color: colors_1.COLORS.darkText
                    } }, "Welcome")),
            react_1["default"].createElement(react_bootstrap_1.Form, null,
                react_1["default"].createElement(react_bootstrap_1.Form.Row, null,
                    react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: "signupEmail" },
                        react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Email"),
                        react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "email", placeholder: "Enter email" }),
                        react_1["default"].createElement(react_bootstrap_1.Form.Text, { className: "text-muted" }))),
                react_1["default"].createElement(react_bootstrap_1.Form.Row, null,
                    react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: "signupPassword" },
                        react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Password"),
                        react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "password", placeholder: "Password" }))),
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
                    }, as: react_router_dom_1.Link, to: "/signup" }, "Sign up")))));
}
exports["default"] = SignUp;
