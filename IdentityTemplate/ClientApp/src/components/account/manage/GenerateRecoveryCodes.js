import React, { useEffect } from 'react';
import { StatusMessage, useStatusMessage } from '../statusMessage';
import { Link, useHistory } from 'react-router-dom';
import { Form, FormGroup, Button } from 'reactstrap';
import { useAccount } from '../useAccount';

const GenerateRecoveryCodes = props => {

    const history = useHistory();

    const [setMessage, statMsgConnector] = useStatusMessage();

    const { GenerateRecoveryCodes, TwoFactorEnabled } = useAccount();

    const generateCodes = () => {
        GenerateRecoveryCodes()
            .then(resp => {
                if (!!resp && !!resp.pathname) {
                    //console.log(resp);
                    history.push(resp);
                }
                else if (!!resp && !!resp.status) {
                    setMessage(resp.status, resp.alertColor);
                }
                else {
                    console.log('Model State Errors:');
                    console.log(resp);
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
            <StatusMessage connector={statMsgConnector}/>
            <h4>Generate two-factor authentication (2FA) recovery codes</h4>
            <div className="alert alert-warning" role="alert">
                <p>
                    <span className="glyphicon glyphicon-warning-sign"></span>
                    <strong>Put these codes in a safe place.</strong>
                </p>
                <p>
                    If you lose your device and don't have the recovery codes you will lose access to your account.
                </p>
                <p>
                    Generating new recovery codes does not change the keys used in authenticator apps. If you wish to change the key
                    used in an authenticator app you should <Link to="/Account/Manage/ResetAuthenticator">reset your authenticator keys.</Link>
                </p>
            </div>
            <div>
                <FormGroup>
                    <Button color="danger" onClick={generateCodes}>Generate Recovery Codes</Button>
                </FormGroup>
            </div>
        </>
    );
};

export default GenerateRecoveryCodes;