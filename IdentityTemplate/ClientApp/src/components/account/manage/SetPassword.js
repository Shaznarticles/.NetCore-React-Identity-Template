import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Label, Button, Input, Form, Row, Col, FormGroup, Container } from 'reactstrap';
import { useForm } from '../../../utils/useForm';
import { StatusMessage, useStatusMessage } from '../statusMessage';


const SetPassword = props => {

    const { statusMessage } = props;

    const [setMessage, statMsgConnector] = useStatusMessage();

    const initModel = {
        newPassword: '',
        confirmPassword: ''
    };

    const { model, onPropChanged } = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

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
                            <Input type="text" name="newPassword" value={model.newPassword} onChange={onPropChanged} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input type="text" name="confirmPassword" value={model.confirmPassword} onChange={onPropChanged} />
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