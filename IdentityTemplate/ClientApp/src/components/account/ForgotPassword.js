import React from 'react';
import { useHistory } from 'react-router-dom';
import { Label, Button, Input, Form, Row, Col, FormGroup, FormFeedback } from 'reactstrap';
import { useForm } from '../../utils/useForm';
import { useAccount } from './useAccount';

const ForgotPassword = props => {

    const history = useHistory();

    const { ForgotPassword } = useAccount();

    const initModel = {
        email: ''
    };
    const emailForm = useForm(initModel);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        emailForm.clearErrors();

        ForgotPassword(emailForm.model)
            .then(resp => {
                if (!!resp && !!resp.pathname) {
                    history.push(resp);
                }
                else {
                    emailForm.handleErrors(resp);
                }
            });
    };

    return (
        <>
            <h1>Forgot your password?</h1>
            <h4>Enter your email.</h4>
            <hr />
            <Row>
                <Col md={4}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="text" name="email" value={emailForm.model.email} invalid={!!emailForm.errors.Email} onChange={emailForm.onPropChanged} />
                            <FormFeedback>{emailForm.errors.Email}</FormFeedback>
                        </FormGroup>
                        <Button color='primary'>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default ForgotPassword;