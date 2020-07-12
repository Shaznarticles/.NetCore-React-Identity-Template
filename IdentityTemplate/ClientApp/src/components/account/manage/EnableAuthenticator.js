import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Button, FormFeedback } from 'reactstrap';
import { useForm } from '../../../utils/useForm';
import { useAccount } from '../useAccount';
import { StatusMessage, useStatusMessage } from '../statusMessage';

const EnableAuthenticator = props => {

    const history = useHistory();

    const [sharedKey, setSharedKey] = useState('');
    const [authenticatorUri, setAuthenticatorUri] = useState('');

    const { LoadSharedKeyAndQRCodeUri, Verify2FACode } = useAccount();
    const [setMessage, statMsgConnector] = useStatusMessage();

    const initModel = {
        code: ''
    };
    const codeForm = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        codeForm.clearErrors();

        Verify2FACode(codeForm.model)
            .then(resp => {
                if (!!resp && !!resp.pathname) {
                    history.push(resp);
                }
                else {
                    codeForm.handleErrors(resp);
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
                        <QRCode value={authenticatorUri} />
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
                                        <Input type="text" name="code" value={codeForm.model.code} invalid={!!codeForm.errors.Code} onChange={codeForm.onPropChanged} />
                                        <FormFeedback>{codeForm.errors.Code}</FormFeedback>
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

//
//ISC License

//Copyright(c) 2015, Paul O’Shannessy

//Permission to use, copy, modify, and / or distribute this software for any
//purpose with or without fee is hereby granted, provided that the above
//copyright notice and this permission notice appear in all copies.

//THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
//REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
//FITNESS.IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
//    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
//LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
//OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
//PERFORMANCE OF THIS SOFTWARE.