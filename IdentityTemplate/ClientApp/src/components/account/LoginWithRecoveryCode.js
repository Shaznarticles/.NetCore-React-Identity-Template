import React, { useContext } from 'react';
import UserContext from '../../auth/user';
import { Label, Button, Input, Form, Row, Col, FormGroup, Container } from 'reactstrap';
import { useForm } from '../../utils/useForm';
import { useAccount } from './useAccount';


const LoginWithRecoveryCode = props => {

    const { location, history } = props;

    const { getSignedInUser } = useContext(UserContext);

    const returnUrl = (!!location.state && !!location.state.returnUrl) ? location.state.returnUrl : '/';

    const { LoginWithRecoveryCode } = useAccount();

    const initModel = {
        recoveryCode: '',
        returnUrl: returnUrl
    };

    const { model, onPropChanged } = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        LoginWithRecoveryCode(model)
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
            <h1>Recovery Code Verification</h1>
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
                            <Input type="text" name="recoveryCode" value={model.recoveryCode} onChange={onPropChanged} />
                        </FormGroup>
                        <Button type="submit" class="btn btn-primary">Log in</Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default LoginWithRecoveryCode;