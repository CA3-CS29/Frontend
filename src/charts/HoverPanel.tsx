import React from 'react';

import {COLORS} from '../colors';


export default function HoverPanel() {
    return <div
        id="hover-panel"
        style={{
            position: "absolute",
            zIndex: 10,
            visibility: "hidden",
            padding: "10px",
            backgroundColor: COLORS.accent,
            borderRadius: "5px",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)",
            color: COLORS.darkText,
            fontFamily: "sans-serif",
            textAlign: "justify",
        }}/>
}