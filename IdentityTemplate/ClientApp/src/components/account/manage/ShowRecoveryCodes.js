﻿import React, { useEffect, useState } from 'react';
import { StatusMessage, useStatusMessage } from '../statusMessage';
import { Row, Col } from 'reactstrap';
import { useAccount } from '../useAccount';

const ShowRecoveryCodes = props => {

    const { location } = props;

    const [setMessage, statMsgConnector] = useStatusMessage();

    const [recoveryCodes, setRecoveryCodes] = useState([]);

    useEffect(() => {

        const setStatusAndCodes = () => {
            if (!!location.state) {
                const status = location.state.status || null;
                const codes = location.state.recoveryCodes || [];
                if (!!status) {
                    setMessage(status.status, status.alertColor, 10000);
                    console.log(codes);
                    setRecoveryCodes(codes);
                }
            }
        };

        setStatusAndCodes();

    }, []);

    return (
        <>
            <StatusMessage connector={statMsgConnector}/>
            <h4>Recovery Codes</h4>
            <div className="alert alert-warning" role="alert">
                <p>
                    <strong>Put these codes in a safe place.</strong>
                </p>
                <p>
                    If you lose your device and don't have the recovery codes you will lose access to your account.
                </p>
            </div>
            <Row>
                <Col md={12}>
                    {recoveryCodes.map(code => {
                        return (
                            <>
                                <code className="recovery-code">{code}</code>
                                <br />
                            </>
                        )
                    })}
                </Col>
            </Row>
        </>
    );
};
export default ShowRecoveryCodes;