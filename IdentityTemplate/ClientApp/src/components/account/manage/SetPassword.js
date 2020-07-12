import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Label, Button, Input, Form, Row, Col, FormGroup, Container, FormFeedback } from 'reactstrap';
import { useForm } from '../../../utils/useForm';
import { StatusMessage, useStatusMessage } from '../statusMessage';


const SetPassword = props => {

    const { statusMessage } = props;

    const [setMessage, statMsgConnector] = useStatusMessage();

    const initModel = {
        newPassword: '',
        confirmPassword: ''
    };

    const { model, onPropChanged, handleErrors, errors, clearErrors } = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        clearErrors();

        //submit of new password, and handle errors

    };

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
                            <Input type="text" name="newPassword" value={model.newPassword} invalid={!!errors.NewPassword} onChange={onPropChanged} />
                            <FormFeedback>{errors.NewPassword}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input type="text" name="confirmPassword" value={model.confirmPassword} invalid={!!errors.ConfirmPassword} onChange={onPropChanged} />
                            <FormFeedback>{errors.ConfirmPassword}</FormFeedback>
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