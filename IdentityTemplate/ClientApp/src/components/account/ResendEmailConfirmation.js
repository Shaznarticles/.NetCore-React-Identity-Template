import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { useForm } from '../../utils/useForm';
import { StatusMessage, useStatusMessage } from './statusMessage';
import { useAccount } from './useAccount';


const ResendEmailConfirmation = props => {

    const initModel = {
        email: ''
    };

    const { model, onPropChanged, handleErrors, errors, clearErrors } = useForm(initModel);

    const [setMessage, statMsgConnector] = useStatusMessage();

    const { ResendEmailConfirmation } = useAccount();

    const handleSubmit = (e) => {
        e.preventDefault();

        clearErrors();

        ResendEmailConfirmation(model)
            .then(resp => {
                if (!!resp && !!resp.status) {
                    setMessage(resp.status, resp.alertColor);
                }
                else {
                    handleErrors(resp);
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
                            <Input type="text" name="email" value={model.email} invalid={!!errors.Email} onChange={onPropChanged} />
                            <FormFeedback>{errors.Email}</FormFeedback>
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