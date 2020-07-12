import React from 'react';
import { Label, Button, Input, Form, Row, Col, FormGroup, Container, FormFeedback } from 'reactstrap';
import { useForm } from '../../utils/useForm';
import { useLocation } from 'react-router-dom';

const ExternalLogin = props => {

    const location = useLocation();

    const returnUrl = (!!location.state && !!location.state.returnUrl) ? location.state.returnUrl : '/';
    const providerDisplayName = (!!location.state && !!location.state.providerDisplayName) ? location.state.providerDisplayName : '';

    const initModel = {
        email: ''
    };

    const { model, onPropChanged, handleErrors, errors, clearErrors } = useForm(initModel);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        clearErrors();

        //register with external login and handle errors

    };

    return (
        <>
            <h1>Register</h1>
            <h4 id="external-login-title">Associate your {providerDisplayName} account.</h4>
            <hr />

            <p id="external-login-description" class="text-info">
                You've successfully authenticated with <strong>{providerDisplayName}</strong>.
                Please enter an email address for this site below and click the Register button to finish
                logging in.
            </p>

            <Row>
                <Col md={4}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="text" name="email" value={model.email} invalid={!!errors.Email} onChange={onPropChanged} />
                            <FormFeedback>{errors.Email}</FormFeedback>
                        </FormGroup>
                        <Button color='primary'>Register</Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default ExternalLogin;