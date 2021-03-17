import React from "react";
import {Alert} from "react-bootstrap";
import {COLORS} from '../colors';


export interface AlertInfo {
    variant: string,
    text: string,
}

export function AlertViewer(
    props: { alerts: AlertInfo[], setAlerts: React.Dispatch<React.SetStateAction<AlertInfo[]>> }
) {
    if (props.alerts && props.alerts.length > 0) {
        const mappedAlerts = props.alerts.map((alertInfo: AlertInfo, index) =>
            <DismissibleAlert info={alertInfo} setAlerts={props.setAlerts} index={index} key={index}/>
        );
        return <div>{mappedAlerts}</div>
    } else {
        return <></>
    }
}

function DismissibleAlert(
    props: { info: AlertInfo, setAlerts: React.Dispatch<React.SetStateAction<AlertInfo[]>>, index: number }
) {
    return (
        <Alert
            variant={props.info.variant}
            onClose={() => {
                props.setAlerts(alerts => alerts.filter((alert, index) => index !== props.index));
            }}
            style={{
                marginTop: 10,
                color: COLORS.darkText,
            }}
            dismissible
        >
            {props.info.text}
        </Alert>
    )
}