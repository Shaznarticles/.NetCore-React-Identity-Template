﻿import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, FormGroup } from 'reactstrap';
import { useAccount } from '../useAccount';

const Disable2fa = props => {

    const history = useHistory();

    const { TwoFactorEnabled, Disable2fa } = useAccount();

    const handleSubmit = (e) => {
        e.preventDefault();

        Disable2fa()
            .then(resp => {
                if (!!resp && !!resp.pathname) {
                    history.push(resp);
                }                
            });

    };

    useEffect(() => {

        TwoFactorEnabled()
            .then(enabled => {
                if (!enabled) history.push("/Account/Manage/TwoFactorAuthentication");
            });
        
    }, []);

    return (
        <>
            <h2>Disable two-factor authentication (2FA)</h2>

            <div className="alert alert-warning" role="alert">
                <p>
                    <strong>This action only disables 2FA.</strong>
                </p>
                <p>
                    Disabling 2FA does not change the keys used in authenticator apps. If you wish to change the key
                    used in an authenticator app you should <Link to="/Account/Manage/ResetAuthenticator">reset your authenticator keys.</Link>
                </p>
            </div>

            <div>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Button color='danger'>Disable 2FA</Button>
                    </FormGroup>
                </Form>
            </div>
        </>
    );
};

export default Disable2fa;