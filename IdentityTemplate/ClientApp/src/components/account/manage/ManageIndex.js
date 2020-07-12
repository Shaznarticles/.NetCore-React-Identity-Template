﻿import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Label, Button, Input, Form, Row, Col, FormGroup, Container, Alert, FormFeedback } from 'reactstrap';
import { useForm } from '../../../utils/useForm';
import UserContext from '../../../auth/user';
import { StatusMessage, useStatusMessage } from '../statusMessage';
import { useAccount } from '../useAccount';


const ManageIndex = props => {

    const { userConfig, getSignedInUser } = useContext(UserContext);

    const { UpdateProfile } = useAccount();
    const [setMessage, statMsgConnector] = useStatusMessage();

    const initModel = {
        userName: '',
        phoneNumber: ''
    };
    const profileForm = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        profileForm.clearErrors();

        UpdateProfile(profileForm.model)
            .then(resp => {
                if (!!resp && !!resp.status) {
                    setMessage(resp.status, resp.alertColor);
                    getSignedInUser();
                }
                else {
                    profileForm.handleErrors(resp);
                }
            });
    };

    useEffect(() => {

        if (!userConfig.user) profileForm.setObject(initModel);
        else profileForm.setObject(userConfig.user);

    }, [userConfig.user]);

    return (
        <>
            <h4>Profile</h4>
            <StatusMessage connector={statMsgConnector}/>
            <Row>
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="userName">Username</Label>
                            <Input type="text" name="userName" value={profileForm.model.userName} disabled />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phoneNumber">Phone Number</Label>
                            <Input type="text" name="phoneNumber" value={profileForm.model.phoneNumber} invalid={!!profileForm.errors.PhoneNumber} onChange={profileForm.onPropChanged} />
                            <FormFeedback>{profileForm.errors.PhoneNumber}</FormFeedback>
                        </FormGroup>  
                        <FormGroup>
                            <Button color='primary'>Save</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default ManageIndex;