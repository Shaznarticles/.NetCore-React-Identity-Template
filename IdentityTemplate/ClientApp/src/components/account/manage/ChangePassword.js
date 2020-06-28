import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Label, Button, Input, Form, Row, Col, FormGroup, Container } from 'reactstrap';
import { useForm } from '../../../utils/useForm';
import { StatusMessage, useStatusMessage } from '../statusMessage';
import { useAccount } from '../useAccount';

const ChangePassword = props => {

    const initModel = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    const { model, onPropChanged } = useForm(initModel);
    const [setMessage, statMsgConnector] = useStatusMessage();

    const { ChangePassword } = useAccount();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (model.newPassword === model.confirmPassword) {

            ChangePassword(model)
                .then(resp => {
                    if (!!resp && !!resp.status) {
                        setMessage(resp.status, resp.alertColor);
                    }
                    else {
                        console.log('Model State Errors:');
                        console.log(resp);
                    }
                });
        }
        else {
            setMessage('New Password and Confirm Password do not match.', 'danger');
        }
    };

    return (
        <>
            <h4>Change password</h4>
            <StatusMessage connector={statMsgConnector} />
            <Row>
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="oldPassword">Old Password</Label>
                            <Input type="password" name="oldPassword" value={model.oldPassword} onChange={onPropChanged} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="newPassword">New Password</Label>
                            <Input type="password" name="newPassword" value={model.newPassword} onChange={onPropChanged} />
                        </FormGroup>       
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input type="password" name="confirmPassword" value={model.confirmPassword} onChange={onPropChanged} />
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