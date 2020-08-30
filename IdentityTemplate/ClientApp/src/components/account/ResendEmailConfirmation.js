import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { useForm } from '../../utils/useForm';
import { useStatusMessage } from './statusMessage';
import { useAccount } from './useAccount';


const ResendEmailConfirmation = props => {

    const [Status, setStatus] = useStatusMessage();
    const { ResendEmailConfirmation } = useAccount();

    const initModel = {
        email: ''
    };
    const emailForm = useForm(initModel);
      
    const handleSubmit = (e) => {
        e.preventDefault();

        emailForm.clearErrors();

        ResendEmailConfirmation(emailForm.model)
            .then(resp => {
                if (!!resp && !!resp.status) {
                    setStatus(resp.status, resp.alertColor);
                }
                else {
                    emailForm.handleErrors(resp);
                }
            });
    };

    return (
        <>
            <h1>Resend Email Confirmation</h1>
            <Status />
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