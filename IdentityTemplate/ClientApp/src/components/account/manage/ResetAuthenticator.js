import React, { useState } from 'react';
import { Button, Row, Col, FormGroup, Form } from 'reactstrap';
import { StatusMessage, useStatusMessage } from '../statusMessage';

const ResetAuthenticator = props => {

    const [setMessage, statMsgConnector] = useStatusMessage();

    const resetKey = () => {

    };

    return (
        <>
            <StatusMessage connector={statMsgConnector}/>
            <h4>Reset Authenticator key</h4>
            <div className="alert alert-warning" role="alert">
                <p>
                    <span className="glyphicon glyphicon-warning-sign"></span>
                    <strong>If you reset your authenticator key your authenticator app will not work until you reconfigure it.</strong>
                </p>
                <p>
                    This process disables 2FA until you verify your authenticator app.
                    If you do not complete your authenticator app configuration you may lose access to your account.
                </p>
            </div>
            <div>
                <FormGroup>
                    <Button color="danger" onClick={resetKey}>Reset authenticator key</Button>
                </FormGroup>
            </div>
        </>
    );
};

export default ResetAuthenticator;