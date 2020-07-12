import React from 'react';
import { useHistory } from 'react-router-dom';
import { Label, Button, Input, Form, Row, Col, FormGroup, Container, FormFeedback } from 'reactstrap';
import { useForm } from '../../utils/useForm';
import { useAccount } from './useAccount';

const ForgotPassword = props => {

    const history = useHistory();

    const initModel = {
        email: ''
    };

    const { model, onPropChanged, handleErrors, errors, clearErrors } = useForm(initModel);
    const { ForgotPassword } = useAccount();

    const handleSubmit = (e) => {
        e.preventDefault();

        clearErrors();

        ForgotPassword(model)
            .then(resp => {
                if (!!resp && !!resp.pathname) {
                    history.push(resp);
                }
                else {
                    handleErrors(resp);
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
                            <Input type="text" name="email" value={model.email} invalid={!!errors.Email} onChange={onPropChanged} />
                            <FormFeedback>{errors.Email}</FormFeedback>
                        </FormGroup>
                        <Button color='primary'>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default ForgotPassword;