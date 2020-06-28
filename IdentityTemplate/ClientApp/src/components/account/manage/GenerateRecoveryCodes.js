import React from 'react';
import { StatusMessage, useStatusMessage } from '../statusMessage';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Button } from 'reactstrap';

const GenerateRecoveryCodes = props => {

    const [setMessage, statMsgConnector] = useStatusMessage();

    const generateCodes = () => {

    };

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