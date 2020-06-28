import React, { useEffect, useState } from 'react';
import { useForm } from '../../../utils/useForm';
import { useAccount } from '../useAccount';
import { StatusMessage, useStatusMessage } from '../statusMessage';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Button } from 'reactstrap';

const EnableAuthenticator = props => {

    const { history } = props;

    const { LoadSharedKeyAndQRCodeUri, Verify2FACode } = useAccount();

    const [sharedKey, setSharedKey] = useState('');
    const [authenticatorUri, setAuthenticatorUri] = useState('');

    const [setMessage, statMsgConnector] = useStatusMessage();

    const initModel = {
        code: ''
    };

    const { model, onPropChanged } = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        Verify2FACode(model)
            .then(resp => {
                if (!!resp && !!resp.pathname) {
                    history.push(resp);
                }
                else {
                    console.log('Model State Errors:');
                    console.log(resp);
                }
            });
    };

    useEffect(() => {

        LoadSharedKeyAndQRCodeUri()
            .then(resp => {
                setSharedKey(resp.sharedKey);
                setAuthenticatorUri(resp.authenticatorUri);
            });

    }, []);

    return (
        <>
            <StatusMessage connector={statMsgConnector}/>
            <h4>Configure authenticator app</h4>
            <div>
                <p>To use an authenticator app go through the following steps:</p>
                <ol className="list">
                    <li>
                        <p>
                            Download a two-factor authenticator app like Microsoft Authenticator for
                            <a href="https://go.microsoft.com/fwlink/?Linkid=825072">Android</a> and
                            <a href="https://go.microsoft.com/fwlink/?Linkid=825073">iOS</a> or
                            Google Authenticator for
                            <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&amp;hl=en">Android</a> and
                            <a href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8">iOS</a>.
                        </p>
                    </li>
                    <li>
                        <p>Scan the QR Code or enter this key <kbd>{sharedKey}</kbd> into your two factor authenticator app. Spaces and casing do not matter.</p>
                        <div className="alert alert-info">Learn how to <a href="https://go.microsoft.com/fwlink/?Linkid=852423">enable QR code generation</a>.</div>
                        <div id="qrCode"></div>
                        <div id="qrCodeData" data-url={authenticatorUri}></div>
                    </li>
                    <li>
                        <p>
                            Once you have scanned the QR code or input the key above, your two factor authentication app will provide you
                            with a unique code. Enter the code in the confirmation box below.
                        </p>
                        <Row>
                            <Col md={6}>
                                <Form id="send-code" onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label for="code">Verification Code</Label>
                                        <Input type="text" name="code" value={model.code} onChange={onPropChanged} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Button color='primary'>Verify</Button>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </li>
                </ol>
            </div>
        </>
    );
};

export default EnableAuthenticator;