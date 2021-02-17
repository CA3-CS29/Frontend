import React, {useState} from "react";
import {Alert} from "react-bootstrap";


export interface AlertInfo {
    variant: string,
    text: string,
}

export function AlertViewer(props: { alerts: AlertInfo[] }) {
    if (props.alerts && props.alerts.length > 0) {
        const mappedAlerts = props.alerts.map((alertInfo: AlertInfo, index) =>
            <DismissibleAlert info={alertInfo} key={index}/>
        );
        return <div>{mappedAlerts}</div>
    } else {
        return <></>
    }
}

function DismissibleAlert(props: { info: AlertInfo }) {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant={props.info.variant} onClose={() => setShow(false)} style={{marginTop: 10}} dismissible>
                {props.info.text}
            </Alert>
        )
    } else {
        return <></>
    }
}