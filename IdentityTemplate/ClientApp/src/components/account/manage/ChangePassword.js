import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Label, Button, Input, Form, Row, Col, FormGroup, Container, FormFeedback } from 'reactstrap';
import { useForm } from '../../../utils/useForm';
import { StatusMessage, useStatusMessage } from '../statusMessage';
import { useAccount } from '../useAccount';

const ChangePassword = props => {

    const initModel = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    const { model, onPropChanged, handleErrors, errors, clearErrors } = useForm(initModel);
    const [setMessage, statMsgConnector] = useStatusMessage();

    const { ChangePassword } = useAccount();

    const handleSubmit = (e) => {
        e.preventDefault();

        clearErrors();

        if (model.newPassword === model.confirmPassword) {

            ChangePassword(model)
                .then(resp => {
                    if (!!resp && !!resp.status) {
                        setMessage(resp.status, resp.alertColor);
                    }
                    else {
                        handleErrors(resp);
                    }
                });
        }
        else {
            setMessage('New Password and Confirm Password do not match.', 'danger');
        }
    };

    useEffect(() => {

        if (!!errors.ModelErrors) {
            setMessage(errors.ModelErrors, 'danger');
        }

    }, [errors.ModelErrors]);

    return (
        <>
            <h4>Change password</h4>
            <StatusMessage connector={statMsgConnector} />
            <Row>
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="oldPassword">Old Password</Label>
                            <Input type="password" name="oldPassword" value={model.oldPassword} invalid={!!errors.OldPassword} onChange={onPropChanged} />
                            <FormFeedback>{errors.OldPassword}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="newPassword">New Password</Label>
                            <Input type="password" name="newPassword" value={model.newPassword} invalid={!!errors.NewPassword} onChange={onPropChanged} />
                            <FormFeedback>{errors.NewPassword}</FormFeedback>
                        </FormGroup>       
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input type="password" name="confirmPassword" value={model.confirmPassword} invalid={!!errors.ConfirmPassword} onChange={onPropChanged} />
                            <FormFeedback>{errors.ConfirmPassword}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Button color='primary'>Update password</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default ChangePassword;