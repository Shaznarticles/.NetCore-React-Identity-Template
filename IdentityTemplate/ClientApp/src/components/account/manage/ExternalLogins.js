﻿import React from 'react';
import { StatusMessage, useStatusMessage } from '../statusMessage';
import { Form, Button, FormGroup } from 'reactstrap';

const ExternalLogins = props => {

    const { currentLogins, showRemoveButton, otherLogins } = props;

    const [setMessage, statMsgConnector] = useStatusMessage();

    const removeProvider = (provider, pkey) => {

    };

    const addProvider = (name) => {

    };

    return (
        <>
            <StatusMessage conncetor={statMsgConnector} />
            {(currentLogins && currentLogins.length > 0) && (
                <>
                <h4>Registered Logins</h4>
                <table className="table">
                    <tbody>
                        {currentLogins.map(login => {
                            return (
                                <tr>
                                    <td>{login.ProviderDisplayName}</td>
                                    <td>
                                        {(showRemoveButton) ?
                                            (
                                                <FormGroup>
                                                    <Button color="primary" onClick={removeProvider(login.LoginProvider, login.ProviderKey)} title={`Remove this ${login.ProviderDisplayName} login from your account`}>Remove</Button>
                                                </FormGroup>
                                            ) : (
                                                <div>&nbsp;</div>
                                            )
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>
                    </>
            )}

            {(otherLogins && otherLogins.length > 0) && (
                <>
                <h4>Add another service to log in.</h4>
                <hr />
                <Form>
                    <div id="socialLoginList">
                        <p>
                            {otherLogins.map(provider => {
                                return (
                                    <Button color="primary" onClick={addProvider(provider.Name)} value={provider.Name} title={`Log in using your ${provider.DisplayName} account`}>{provider.DisplayName}</Button>
                                )
                            })}
                        </p>
                    </div>
                    </Form>
                    </>
            )}
        </>
    );
};

export default ExternalLogins;