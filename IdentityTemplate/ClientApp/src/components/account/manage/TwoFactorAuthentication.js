import React, { useEffect, useState } from 'react';
import { StatusMessage, useStatusMessage } from '../statusMessage';
import { Link, useLocation } from 'react-router-dom';
import { Form, Button, FormGroup } from 'reactstrap';
import { useAccount } from '../useAccount';

const CodesLeftAlert = (props) => {

    const [gotCodes, setGotCodes] = useState(false);
    const [codesLeft, setCodesLeft] = useState(0);

    const { RecoveryCodesLeft } = useAccount();

    useEffect(() => {

        const getCodesLeft = () => {
            RecoveryCodesLeft()
                .then(resp => {
                    setGotCodes(true);
                    setCodesLeft(resp);
                });
        }

        getCodesLeft();

    }, []);

    return (
        <>
            {gotCodes && (
                <>
                    {(codesLeft === 0) && (
                        <div className="alert alert-danger">
                            <strong>You have no recovery codes left.</strong>
                            <p>You must <Link to="/Account/Manage/GenerateRecoveryCodes">generate a new set of recovery codes</Link> before you can log in with a recovery code.</p>
                        </div>
                    )}

                    {(codesLeft === 1) && (
                        <div className="alert alert-danger">
                            <strong>You have 1 recovery code left.</strong>
                            <p>You can <Link to="Account/Manage/GenerateRecoveryCodes">generate a new set of recovery codes</Link>.</p>
                        </div>
                    )}

                    {(codesLeft > 1 && codesLeft <= 3) && (
                        <div className="alert alert-warning">
                            <strong>You have {codesLeft} recovery codes left.</strong>
                            <p>You should <Link to="/Account/Manage/GenerateRecoveryCodes">generate a new set of recovery codes</Link>.</p>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

const TwoFactorAuthentication = props => {

    const location = useLocation();
        
    const [is2faEnabled, setIs2faEnabled] = useState(false);
    const [isMachineRemembered, setIsMachineRemembered] = useState(false);
    const [hasAuthenticator, setHasAuthenticator] = useState(false);

    const { TwoFactorEnabled, HasAuthenticator, IsMachineRemembered, ForgetBrowser } = useAccount();

    const [setMessage, statMsgConnector] = useStatusMessage();

    const forgetBrowser = () => {
        ForgetBrowser()
            .then(resp => {
                if (!!resp && !!resp.status) {
                    setMessage(resp.status, resp.alertColor, 10000);
                }
                else {
                    console.log('Model State Errors:');
                    console.log(resp);
                }
            });
    };

    useEffect(() => {

        const status = (!!location.state && !!location.state.status) ? location.state.status : null;
        if (!!status) {
            setMessage(status.status, status.alertColor, 10000);
        }

        TwoFactorEnabled()
            .then(resp => {
                setIs2faEnabled(resp);
            });

        HasAuthenticator()
            .then(resp => {
                setHasAuthenticator(resp);
            });

        IsMachineRemembered()
            .then(resp => {
                setIsMachineRemembered(resp);
            });

    }, []);

    return (
        <>
            <StatusMessage connector={statMsgConnector} />
            <h4>Two-factor authentication (2FA)</h4>
            {is2faEnabled && (
                <>
                    <CodesLeftAlert />

                    {isMachineRemembered &&
                        (
                            <FormGroup>
                                <Button color="secondary" onClick={forgetBrowser}>Forget this browser</Button>
                            </FormGroup>
                        )}
                    <Link to="/Account/Manage/Disable2fa" className="btn btn-secondary mr-2">Disable 2FA</Link>
                    <Link to="/Account/Manage/GenerateRecoveryCodes" className="btn btn-secondary ml-2">Reset recovery codes</Link>
                </>
            )}

            <h5 className='mt-3'>Authenticator app</h5>
            {(!hasAuthenticator) ?
                (
                    <Link to="/Account/Manage/EnableAuthenticator" className="btn btn-secondary">Add authenticator app</Link>
                ) : (
                    <>
                        <Link to="/Account/Manage/EnableAuthenticator" className='btn btn-secondary mr-2'>Setup authenticator app</Link>
                        <Link to="/Account/Manage/ResetAuthenticator" className="btn btn-secondary ml-2">Reset authenticator app</Link>
                    </>
                )}
        </>
    );
};

export default TwoFactorAuthentication;