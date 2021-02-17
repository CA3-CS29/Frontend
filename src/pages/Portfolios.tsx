import React from 'react';
import {COLORS} from '../colors';
import '../App.css';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'

export default function Portfolios() {
    return (
        <div>
            <h1
                className="MediumText"
                style={{
                    color: COLORS.darkText,
                }}
            >
                Portfolios
            </h1>

            <Button
                className="Button mr-1"
                style={{
                    color: COLORS.darkText,
                    backgroundColor: COLORS.highlight,
                    borderColor: COLORS.highlight,
                }}
                as={Link} to="/portfolio/portfolio"
            >
                portfolio
            </Button>
        </div>
    )
}