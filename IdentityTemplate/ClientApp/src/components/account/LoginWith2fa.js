import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import UserContext from '../../auth/user';
import { StatusMessage, useStatusMessage } from './statusMessage';
import { Label, Button, Input, Form, Row, Col, FormGroup, Container, FormFeedback } from 'reactstrap';
import { useForm } from '../../utils/useForm';
import { useAccount } from './useAccount';

const LoginWith2fa = props => {

    const history = useHistory();
    const location = useLocation();

    const { getSignedInUser } = useContext(UserContext);

    const [setMessage, statMsgConnector] = useStatusMessage();

    const returnUrl = (!!location.state && !!location.state.returnUrl) ? location.state.returnUrl : '/';
    const rememberMe = (!!location.state && !!location.state.rememberMe) ? location.state.rememberMe : false;

    const { LoginWith2fa } = useAccount();

    const initModel = {
        twoFactorCode: '',
        rememberMachine: false,
        rememberMe: rememberMe,
        returnUrl: returnUrl
    };

    const { model, onPropChanged, onCheckChanged, handleErrors, errors, clearErrors } = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        clearErrors();

        LoginWith2fa(model)
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

    useEffect(() => {

        if (!!errors.ModelErrors) {
            setMessage(errors.ModelErrors, 'danger');
        }

    }, [errors.ModelErrors]);

    return (
        <>
            <h1>Two-factor authentication</h1>
            <StatusMessage connector={statMsgConnector} />

            <hr />
            <p>Your login is protected with an authenticator app. Enter your authenticator code below.</p>
            <Row>
                <Col md={4}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="twoFactorCode">Two Factor Code</Label>
                            <Input type="text" name="twoFactorCode" value={model.twoFactorCode} invalid={!!errors.TwoFactorCode} onChange={onPropChanged} autocomplete='off' />
                            <FormFeedback>{errors.TwoFactorCode}</FormFeedback>
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