import React, { useContext, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Label, Button, Input, Form, Row, Col, FormGroup, FormFeedback } from 'reactstrap';
import UserContext from '../../auth/user';
import { StatusMessage, useStatusMessage } from './statusMessage';
import { useForm } from '../../utils/useForm';
import { useAccount } from './useAccount';


const LoginWithRecoveryCode = props => {

    const location = useLocation();
    const history = useHistory();

    const returnUrl = (!!location.state && location.state.returnUrl) || '/';

    const { getSignedInUser } = useContext(UserContext);

    const [setMessage, statMsgConnector] = useStatusMessage();
    const { LoginWithRecoveryCode } = useAccount();

    const initModel = {
        recoveryCode: '',
        returnUrl: returnUrl
    };
    const loginForm = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        loginForm.clearErrors();

        LoginWithRecoveryCode(loginForm.model)
            .then(resp => {
                if (!!resp && !!resp.pathname) {
                    getSignedInUser();

                    history.push(resp);
                }
                else {
                    loginForm.handleErrors(resp);
                }
            });
    };

    useEffect(() => {

        if (!!loginForm.errors.ModelErrors) {
            setMessage(loginForm.errors.ModelErrors, 'danger');
        }

    }, [loginForm.errors.ModelErrors]);

    return (
        <>
            <h1>Recovery Code Verification</h1>
            <StatusMessage connector={statMsgConnector} />

            <hr />
            <p>
                You have requested to log in with a recovery code. This login will not be remembered until you provide
                an authenticator app code at log in or disable 2FA and log in again.
            </p>
            <Row>
                <Col md={4}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="recoveryCode">Recovery Code</Label>
                            <Input type="text" name="recoveryCode" value={loginForm.model.recoveryCode} invalid={!!loginForm.errors.RecoveryCode} onChange={loginForm.onPropChanged} />
                            <FormFeedback>{loginForm.errors.RecoveryCode}</FormFeedback>
                        </FormGroup>
                        <Button type="submit" class="btn btn-primary">Log in</Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default LoginWithRecoveryCode;