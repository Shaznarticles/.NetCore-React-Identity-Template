import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Label, Button, Input, Form, Row, Col, FormGroup, FormFeedback } from 'reactstrap';
import { useForm } from '../../../utils/useForm';
import { StatusMessage, useStatusMessage } from '../statusMessage';
import { useAccount } from '../useAccount';

const SetPassword = props => {

    const history = useHistory();

    const [setMessage, statMsgConnector] = useStatusMessage();
    const { HasPassword, SetPassword } = useAccount();

    const initModel = {
        newPassword: '',
        confirmPassword: ''
    };
    const pwForm = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        pwForm.clearErrors();

        SetPassword(pwForm.model)
            .then(resp => {
                if (!!resp && !!resp.status) {
                    setMessage(resp.status, resp.alertColor);
                }
                else {
                    pwForm.handleErrors(resp);
                }
            });
    };

    useEffect(() => {
                
        HasPassword()
            .then(hasPw => {
                if (hasPw) history.push('/Account/Manage/ChangePassword');
            });

    }, []);

    return (
        <>
            <h4>Set your password</h4>
            <StatusMessage connector={statMsgConnector}/>
            <p className="text-info">
                You do not have a local username/password for this site. Add a local
                account so you can log in without an external login.
            </p>
            <Row>
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="newPassword">New Password</Label>
                            <Input type="text" name="newPassword" value={pwForm.model.newPassword} invalid={!!pwForm.errors.NewPassword} onChange={pwForm.onPropChanged} />
                            <FormFeedback>{pwForm.errors.NewPassword}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input type="text" name="confirmPassword" value={pwForm.model.confirmPassword} invalid={!!pwForm.errors.ConfirmPassword} onChange={pwForm.onPropChanged} />
                            <FormFeedback>{pwForm.errors.ConfirmPassword}</FormFeedback>
                        </FormGroup>     
                        <FormGroup>
                            <Button color='primary'>Set password</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default SetPassword;