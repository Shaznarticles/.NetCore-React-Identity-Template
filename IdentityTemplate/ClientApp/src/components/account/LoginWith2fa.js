import React, { useContext, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import UserContext from '../../auth/user';
import { useStatusMessage } from './statusMessage';
import { Label, Button, Input, Form, Row, Col, FormGroup, FormFeedback } from 'reactstrap';
import { useForm } from '../../utils/useForm';
import { useAccount } from './useAccount';

const LoginWith2fa = props => {

    const history = useHistory();
    const location = useLocation();

    const returnUrl = (!!location.state && location.state.returnUrl) || '/';
    const rememberMe = (!!location.state && location.state.rememberMe) || false;

    const { getSignedInUser } = useContext(UserContext);

    const [Status, setStatus] = useStatusMessage();   
    const { LoginWith2fa } = useAccount();

    const initModel = {
        twoFactorCode: '',
        rememberMachine: false,
        rememberMe: rememberMe,
        returnUrl: returnUrl
    };
    const loginForm = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        loginForm.clearErrors();

        LoginWith2fa(loginForm.model)
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
            setStatus(loginForm.errors.ModelErrors, 'danger');
        }

    }, [loginForm.errors.ModelErrors]);

    return (
        <>
            <h1>Two-factor authentication</h1>
            <Status />

            <hr />
            <p>Your login is protected with an authenticator app. Enter your authenticator code below.</p>
            <Row>
                <Col md={4}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="twoFactorCode">Two Factor Code</Label>
                            <Input type="text" name="twoFactorCode" value={loginForm.model.twoFactorCode} invalid={!!loginForm.errors.TwoFactorCode} onChange={loginForm.onPropChanged} autocomplete='off' />
                            <FormFeedback>{loginForm.errors.TwoFactorCode}</FormFeedback>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="rememberMachine" checked={loginForm.model.rememberMachine} onChange={loginForm.onCheckChanged} />{' '}Remember mcahine?
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Button color='primary'>Log in</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <p>
                Don't have access to your authenticator device? You can
                <Link to="/Account/LoginWithRecoveryCode">log in with a recovery code</Link>
            </p>
        </>
    );
};

export default LoginWith2fa;