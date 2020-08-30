import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { useStatusMessage } from '../statusMessage';

const ShowRecoveryCodes = props => {

    const location = useLocation();

    const [recoveryCodes, setRecoveryCodes] = useState([]);

    const [Status, setStatus] = useStatusMessage();

    useEffect(() => {

        const status = (!!location.state && location.state.status) || null;
        const codes = (!!location.state && location.state.recoveryCodes) || null;

        if (!!status) {
            setStatus(status.status, status.alertColor, 10000);
        }

        if (!codes) {
            setRecoveryCodes(codes);
        }

    }, [location.state]);

    return (
        <>
            <Status />
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
                    {!!recoveryCodes && recoveryCodes.map(code => {
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