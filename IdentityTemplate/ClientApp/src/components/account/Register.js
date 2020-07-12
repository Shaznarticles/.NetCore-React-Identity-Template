import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { StatusMessage, useStatusMessage } from './statusMessage';
import { Label, Button, Input, Form, Row, Col, FormGroup, Container, FormFeedback } from 'reactstrap';
import { useForm } from '../../utils/useForm';
import { useAccount } from './useAccount';

const Register = props => {

    const location = useLocation();
    const history = useHistory();

    const [setMessage, statMsgConnector] = useStatusMessage();

    const { GetExternalLogins, Register } = useAccount();

    const returnUrl = (!!location.state && !!location.state.returnUrl) ? location.state.returnUrl : '/';

    const [externalLogins, setExternalLogins] = useState([]);
        
    const initModel = {
        email: '',
        password: '',
        confirmPassword: '',
        returnUrl: returnUrl
    };

    const { model, onPropChanged, handleErrors, errors, clearErrors } = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        clearErrors();

        Register(model)
            .then(resp => {
                if (!!resp && !!resp.pathname) {
                    history.push(resp);
                }
                else {
                    handleErrors(resp);
                }
            });
    };

    const providerLogin = (name) => {

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
            <h1>Register</h1>
            <StatusMessage connector={statMsgConnector} />

            <Row>
                <Col md={4}>
                    <Form onSubmit={handleSubmit}>
                        <h4>Create a new account.</h4>
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
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input type="password" name="confirmPassword" value={model.confirmPassword} invalid={!!errors.ConfirmPassword} onChange={onPropChanged} />
                            <FormFeedback>{errors.ConfirmPassword}</FormFeedback>
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