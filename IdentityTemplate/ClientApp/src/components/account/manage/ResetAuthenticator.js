﻿import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, FormGroup } from 'reactstrap';
import { useAccount } from '../useAccount';

const ResetAuthenticator = props => {

    const history = useHistory();

    const { ResetAuthenticator } = useAccount();

    const resetKey = () => {

        ResetAuthenticator()
            .then(resp => {
                if (!!resp && !!resp.pathname) {
                    history.push(resp);
                }                
            });

    };

    return (
        <>
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