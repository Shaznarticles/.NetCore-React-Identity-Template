import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Label, Button, Input, Form, Row, Col, FormGroup, Container, Alert } from 'reactstrap';
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

    const { model, onPropChanged, setObject } = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        UpdateProfile(model)
            .then(resp => {
                if (!!resp && !!resp.status) {
                    setMessage(resp.status, resp.alertColor);
                    getSignedInUser();
                }
                else {
                    console.log('Model State Errors:');
                    console.log(resp);
                }
            });
    };

    useEffect(() => {

        if (!userConfig.user) setObject(initModel);
        else setObject(userConfig.user);

        //console.log(userConfig.user);

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
                            <Input type="text" name="userName" value={model.userName} disabled />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phoneNumber">Phone Number</Label>
                            <Input type="text" name="phoneNumber" value={model.phoneNumber} onChange={onPropChanged} />
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