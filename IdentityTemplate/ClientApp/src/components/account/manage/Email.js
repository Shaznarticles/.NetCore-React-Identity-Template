import React, { useEffect, useContext, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Button, FormFeedback } from 'reactstrap';
import { StatusMessage, useStatusMessage } from '../statusMessage';
import { useForm } from '../../../utils/useForm';
import UserContext from '../../../auth/user';
import { useAccount } from '../useAccount';


const ManageEmail = props => {

    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const { userConfig } = useContext(UserContext);

    const [setMessage, statMsgConnector] = useStatusMessage();
    const { IsEmailConfirmed, SendEmailVerification, ChangeEmail } = useAccount();

    const initModel = {
        newEmail: ''
    };
    const emailForm = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        emailForm.clearErrors();

        ChangeEmail(emailForm.model)
            .then(resp => {
                if (!!resp && !!resp.status) {
                    setMessage(resp.status, resp.alertColor);
                }
                else {
                    emailForm.handleErrors(resp);
                }
            });
    };

    const sendEmailVerification = () => {

        emailForm.clearErrors();

        SendEmailVerification()
            .then(resp => {
                if (!!resp && !!resp.status) {
                    setMessage(resp.status, resp.alertColor);
                }                
            });
    };

    useEffect(() => {

        const getEmailConfirmed = () => {
            IsEmailConfirmed()
                .then(resp => {
                    setEmailConfirmed(resp);
                });            
        };

        const getUserEmail = () => {
            let email = (!!userConfig && !!userConfig.user && userConfig.user.email) || '';
            setUserEmail(email);

            emailForm.setObject({ newEmail: email });
        }

        getEmailConfirmed();
        getUserEmail();

    }, [userConfig.user]);

    return (
        <>
            <h4>Manage Email</h4>
            <StatusMessage connector={statMsgConnector}/>
            <Row>
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            {(!emailConfirmed) ?
                                (
                                    <InputGroup>
                                        <Input addon type='text' name='email' disabled value={userEmail}/>
                                        <InputGroupAddon addonType='append'>
                                            <InputGroupText className='font-weight-bold'>✓</InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                ) : (    
                                    <>
                                        <Input type="text" name="email" value={userEmail} disabled />
                                        <Button onClick={sendEmailVerification} color='primary' className='mt-3'>Send verification email</Button>
                                    </>
                                )
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label for="newEmail">New Email</Label>
                            <Input type="text" name="newEmail" value={emailForm.model.newEmail} invalid={!!emailForm.errors.NewEmail} onChange={emailForm.onPropChanged} />
                            <FormFeedback>{emailForm.errors.NewEmail}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Button color='primary'>Change Email</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default ManageEmail;