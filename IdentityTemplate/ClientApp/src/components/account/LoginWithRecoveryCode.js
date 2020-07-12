import React, { useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import UserContext from '../../auth/user';
import { StatusMessage, useStatusMessage } from './statusMessage';
import { Label, Button, Input, Form, Row, Col, FormGroup, Container, FormFeedback } from 'reactstrap';
import { useForm } from '../../utils/useForm';
import { useAccount } from './useAccount';


const LoginWithRecoveryCode = props => {

    const location = useLocation();
    const history = useHistory();

    const { getSignedInUser } = useContext(UserContext);

    const [setMessage, statMsgConnector] = useStatusMessage();

    const returnUrl = (!!location.state && !!location.state.returnUrl) ? location.state.returnUrl : '/';

    const { LoginWithRecoveryCode } = useAccount();

    const initModel = {
        recoveryCode: '',
        returnUrl: returnUrl
    };

    const { model, onPropChanged, handleErrors, errors, clearErrors } = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        clearErrors();

        LoginWithRecoveryCode(model)
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
                            <Input type="text" name="recoveryCode" value={model.recoveryCode} invalid={!!errors.RecoveryCode} onChange={onPropChanged} />
                            <FormFeedback>{errors.RecoveryCode}</FormFeedback>
                        </FormGroup>
                        <Button type="submit" class="btn btn-primary">Log in</Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default LoginWithRecoveryCode;