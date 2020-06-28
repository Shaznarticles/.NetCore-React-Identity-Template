import React from 'react';
import { Label, Button, Input, Form, Row, Col, FormGroup, Container } from 'reactstrap';
import { useForm } from '../../utils/useForm';

const ExternalLogin = props => {

    const { returnUrl, providerDisplayName } = props;

    const initModel = {
        email: ''
    };

    const { model, onPropChanged } = useForm(initModel);
    
    const handleSubmit = (e) => {
        e.preventDefault();

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
                            <Input type="text" name="email" value={model.email} onChange={onPropChanged} />
                        </FormGroup>
                        <Button color='primary'>Register</Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default ExternalLogin;