import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Label, Button, Input, Form, Row, Col, FormGroup, FormFeedback } from 'reactstrap';
import UserContext from '../../auth/user';
import { useStatusMessage } from './statusMessage';
import { useForm } from '../../utils/useForm';
import { useAccount } from './useAccount';

const Login = props => {

    const history = useHistory();
    const location = useLocation();

    const returnUrl = (!!location.state && location.state.returnUrl) || '/';

    const [externalLogins, setExternalLogins] = useState([]);
    const { getSignedInUser } = useContext(UserContext);

    const [Status, setStatus] = useStatusMessage();
    const { GetExternalLogins, Login } = useAccount();

    const initModel = {
        email: '',
        password: '',
        rememberMe: false,
        returnUrl: returnUrl
    };
    const loginForm = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        loginForm.clearErrors();

        Login(loginForm.model)
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

    const externalLogin = (displayName) => {

        history.push({ pathname: '/Account/ExternalLogin', state: { returnUrl, providerDisplayName: displayName } })
    };

    useEffect(() => {

        if (!!loginForm.errors.ModelErrors) {
            setStatus(loginForm.errors.ModelErrors, 'danger');
        }

    }, [loginForm.errors.ModelErrors]);

    useEffect(() => {

        const getExternalLogins = async () => {

            var exLogins = await GetExternalLogins();

            setExternalLogins(exLogins);

        };

        getExternalLogins();

    }, []);

    return (
        <>
            <h1>Log In</h1>
            <Status />
            <Row>
                <Col md={4}>
                    <section>
                        <Form onSubmit={handleSubmit}>
                            <h4>Use a local account to log in.</h4>
                            <hr />
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="text" name="email" value={loginForm.model.email} invalid={!!loginForm.errors.Email} onChange={loginForm.onPropChanged} />
                                <FormFeedback>{loginForm.errors.Email}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" value={loginForm.model.password} invalid={!!loginForm.errors.Password} onChange={loginForm.onPropChanged} />
                                <FormFeedback>{loginForm.errors.Password}</FormFeedback>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="rememberMe" checked={loginForm.model.rememberMe} onChange={loginForm.onCheckChanged} />{' '}Remember me?
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Button className='mt-2' color='primary'>Log in</Button>
                            </FormGroup>
                            <FormGroup>
                                <p>
                                    <Link to='/Account/ForgotPassword'>Forgot your password?</Link>
                                </p>
                                <p>
                                    <Link to={`/Account/Register?returnUrl=${returnUrl}`}>Register as a new user</Link>
                                </p>
                                <p>
                                    <Link to="/Account/ResendEmailConfirmation">Resend email confirmation</Link>
                                </p>
                            </FormGroup>
                        </Form>
                    </section>
                </Col>
                <Col md={6} mdoffset={2}>
                    <section>
                        <h4>Use another service to log in.</h4>
                        <hr />
                        {(!!externalLogins && externalLogins.length > 0) ?
                            (
                                <div>
                                    <p>
                                        {externalLogins.map(xLog =>
                                            (
                                                <Button color="primary" value={xLog.Name} onClick={externalLogin(xLog.DisplayName)} title={`Log in using your ${xLog.DisplayName} account`}>{xLog.DisplayName}</Button>
                                            )
                                        )}
                                    </p>
                                </div>

                            ) : (
                                <div>
                                    <p>
                                        There are no external authentication services configured. See <a href="https://go.microsoft.com/fwlink/?LinkID=532715">this article</a>
                                        for details on setting up this ASP.NET application to support logging in via external services.
                                    </p>
                                </div>
                            )
                        }
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Login;