import React from 'react';
import { useHistory } from 'react-router-dom';
import { Label, Button, Input, Form, Row, Col, FormGroup, Container } from 'reactstrap';
import { useForm } from '../../utils/useForm';
import { useAccount } from './useAccount';

const ForgotPassword = props => {

    const history = useHistory();

    const initModel = {
        email: ''
    };

    const { model, onPropChanged } = useForm(initModel);
    const { ForgotPassword } = useAccount();

    const handleSubmit = (e) => {
        e.preventDefault();

        ForgotPassword(model)
            .then(resp => {
                if (!!resp && !!resp.pathname) {
                    history.push(resp);
                }
                else {
                    console.log('Model State Errors:');
                    console.log(resp);
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
                            <Input type="text" name="email" value={model.email} onChange={onPropChanged} />
                        </FormGroup>
                        <Button color='primary'>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default ForgotPassword;