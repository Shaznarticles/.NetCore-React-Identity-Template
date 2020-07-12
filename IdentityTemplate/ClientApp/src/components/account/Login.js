import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../auth/user';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { StatusMessage, useStatusMessage } from './statusMessage';
import { Label, Button, Input, Form, Row, Col, FormGroup, Container, FormFeedback } from 'reactstrap';
import { useForm } from '../../utils/useForm';
import { useAccount } from './useAccount';

const Login = props => {

    const history = useHistory();
    const location = useLocation();

    const { getSignedInUser } = useContext(UserContext);

    const [setMessage, statMsgConnector] = useStatusMessage();

    const { GetExternalLogins, Login } = useAccount();

    const returnUrl = (!!location.state && !!location.state.returnUrl) ? location.state.returnUrl : '/';

    const [externalLogins, setExternalLogins] = useState([]);

    const initModel = {
        email: '',
        password: '',
        rememberMe: false,
        returnUrl: returnUrl
    };

    const { model, onPropChanged, onCheckChanged, errors, handleErrors, clearErrors } = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        clearErrors();

        Login(model)
            .then(resp => {
                if (!!resp && !!resp.pathname) {
                    getSignedInUser();

                    history.push(resp);
                }
                else {                   
                    handleErrors(resp);
                }
            });
    };

    const externalLogin = (displayName) => {

        history.push({ pathname: '/Account/ExternalLogin', state: { returnUrl, providerDisplayName: displayName } })
    };

    useEffect(() => {

        if (!!errors.ModelErrors) {
            setMessage(errors.ModelErrors, 'danger');
        }

    }, [errors.ModelErrors]);

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
            <StatusMessage connector={statMsgConnector} />
            <Row>
                <Col md={4}>
                    <section>
                        <Form onSubmit={handleSubmit}>
                            <h4>Use a local account to log in.</h4>
                            <hr />
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="text" name="email" value={model.email} invalid={!!errors.Email} onChange={onPropChanged} />
                                <FormFeedback>{errors.Email}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" value={model.password} invalid={!!errors.Password} onChange={onPropChanged} />
                                <FormFeedback>{errors.Password}</FormFeedback>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="rememberMe" checked={model.rememberMe} onChange={onCheckChanged} />{' '}Remember me?
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