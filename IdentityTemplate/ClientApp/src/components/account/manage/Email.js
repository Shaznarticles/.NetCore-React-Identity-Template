import React, { useEffect, useContext, useState } from 'react';
import { StatusMessage, useStatusMessage } from '../statusMessage';
import { useForm } from '../../../utils/useForm';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Button, FormFeedback } from 'reactstrap';
import UserContext from '../../../auth/user';
import { useAccount } from '../useAccount';


const ManageEmail = props => {

    const [setMessage, statMsgConnector] = useStatusMessage();

    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const { userConfig, getSignedInUser } = useContext(UserContext);
    const { IsEmailConfirmed, SendEmailVerification, ChangeEmail } = useAccount();

    const initModel = {
        newEmail: ''
    };

    const { model, onPropChanged, setObject, handleErrors, errors, clearErrors } = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        clearErrors();

        ChangeEmail(model)
            .then(resp => {
                if (!!resp && !!resp.status) {
                    setMessage(resp.status, resp.alertColor);
                }
                else {
                    handleErrors(resp);
                }
            });
    };

    const sendEmailVerification = () => {

        clearErrors();

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

            setObject({ newEmail: email });
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
                            <Input type="text" name="newEmail" value={model.newEmail} invalid={!!errors.NewEmail} onChange={onPropChanged} />
                            <FormFeedback>{errors.NewEmail}</FormFeedback>
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