import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useForm } from '../../utils/useForm';
import { StatusMessage, useStatusMessage } from './statusMessage';
import { useAccount } from './useAccount';


const ResendEmailConfirmation = props => {

    const initModel = {
        email: ''
    };

    const { model, onPropChanged } = useForm(initModel);

    const [setMessage, statMsgConnector] = useStatusMessage();

    const { ResendEmailConfirmation } = useAccount();

    const handleSubmit = (e) => {
        e.preventDefault();

        ResendEmailConfirmation(model)
            .then(resp => {
                if (!!resp && !!resp.status) {
                    setMessage(resp.status, resp.alertColor);
                }
                else {
                    console.log('Model State Errors:');
                    console.log(resp);
                }
            });
    };

    return (
        <>
            <h1>Resend Email Confirmation</h1>
            <StatusMessage connector={statMsgConnector} />
            <h4>Enter your email.</h4>
            <hr />
            <Row>
                <Col md={4}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="text" name="email" value={model.email} onChange={onPropChanged} />
                        </FormGroup>
                        <FormGroup>
                            <Button color='primary'>Resend</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default ResendEmailConfirmation;