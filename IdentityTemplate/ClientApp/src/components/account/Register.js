import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Label, Button, Input, Form, Row, Col, FormGroup, Container, FormFeedback } from 'reactstrap';
import { StatusMessage, useStatusMessage } from './statusMessage';
import { useForm } from '../../utils/useForm';
import { useAccount } from './useAccount';

const Register = props => {

    const location = useLocation();
    const history = useHistory();

    const returnUrl = !!location.state && location.state.returnUrl || '/';

    const [externalLogins, setExternalLogins] = useState([]);

    const [setMessage, statMsgConnector] = useStatusMessage();
    const { GetExternalLogins, Register } = useAccount();
        
    const initModel = {
        email: '',
        password: '',
        confirmPassword: '',
        returnUrl: returnUrl
    };
    const registerForm = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        registerForm.clearErrors();

        Register(registerForm.model)
            .then(resp => {
                if (!!resp && !!resp.pathname) {
                    history.push(resp);
                }
                else {
                    registerForm.handleErrors(resp);
                }
            });
    };

    const providerLogin = (name) => {

    };

    useEffect(() => {

        if (!!registerForm.errors.ModelErrors) {
            setMessage(registerForm.errors.ModelErrors, 'danger');
        }

    }, [registerForm.errors.ModelErrors]);

    useEffect(() => {

        const getExternalLogins = async () => {

            var exLogins = await GetExternalLogins();

            setExternalLogins(exLogins);

        };

        getExternalLogins();

    }, []);

    return (
        <>
            <h1>Register</h1>
            <StatusMessage connector={statMsgConnector} />

            <Row>
                <Col md={4}>
                    <Form onSubmit={handleSubmit}>
                        <h4>Create a new account.</h4>
                        <hr />
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="text" name="email" value={registerForm.model.email} invalid={!!registerForm.errors.Email} onChange={registerForm.onPropChanged} />
                            <FormFeedback>{registerForm.errors.Email}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" value={registerForm.model.password} invalid={!!registerForm.errors.Password} onChange={registerForm.onPropChanged} />
                            <FormFeedback>{registerForm.errors.Password}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input type="password" name="confirmPassword" value={registerForm.model.confirmPassword} invalid={!!registerForm.errors.ConfirmPassword} onChange={registerForm.onPropChanged} />
                            <FormFeedback>{registerForm.errors.ConfirmPassword}</FormFeedback>
                        </FormGroup>                                               
                        <Button color='primary'>Submit</Button>
                    </Form>
                </Col>
                <Col mdoffset={2} md={6}>
                    <section>
                        <h4>Use another service to register.</h4>
                        <hr />
                        {((externalLogins?.Count ?? 0) == 0) ?
                            (
                                <div>
                                    <p>
                                        There are no external authentication services configured. See <a href="https://go.microsoft.com/fwlink/?LinkID=532715">this article</a>
                                        for details on setting up this ASP.NET application to support logging in via external services.
                                    </p>
                                </div>
                            ) : (
                                <Form>
                                    <div>
                                        <p>
                                            {externalLogins.map(xLog =>
                                                (
                                                    <Button color="primary" value={xLog.Name} title={`Log in using your ${xLog.DisplayName} account`}>{xLog.DisplayName}</Button>
                                                )
                                            )}
                                        </p>
                                    </div>
                                </Form>
                            )
                        }
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Register;