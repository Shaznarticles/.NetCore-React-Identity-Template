import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import UserContext from '../../auth/user';
import { Label, Button, Input, Form, Row, Col, FormGroup, Container } from 'reactstrap';
import { useForm } from '../../utils/useForm';
import { useAccount } from './useAccount';

const LoginWith2fa = props => {

    const history = useHistory();
    const location = useLocation();

    const { getSignedInUser } = useContext(UserContext);

    const returnUrl = (!!location.state && !!location.state.returnUrl) ? location.state.returnUrl : '/';
    const rememberMe = (!!location.state && !!location.state.rememberMe) ? location.state.rememberMe : false;

    const { LoginWith2fa } = useAccount();

    const initModel = {
        twoFactorCode: '',
        rememberMachine: false,
        rememberMe: rememberMe,
        returnUrl: returnUrl
    };

    const { model, onPropChanged, onCheckChanged } = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        LoginWith2fa(model)
            .then(resp => {
                if (!!resp && !!resp.pathname) {
                    getSignedInUser();

                    history.push(resp);
                }
                else {
                    console.log('Model State Errors:');
                    console.log(resp);
                }
            });
    };

    return (
        <>
            <h1>Two-factor authentication</h1>
            <hr />
            <p>Your login is protected with an authenticator app. Enter your authenticator code below.</p>
            <Row>
                <Col md={4}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="twoFactorCode">Two Factor Code</Label>
                            <Input type="text" name="twoFactorCode" value={model.twoFactorCode} onChange={onPropChanged} autocomplete='off' />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="rememberMachine" checked={model.rememberMachine} onChange={onCheckChanged} />{' '}Remember mcahine?
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