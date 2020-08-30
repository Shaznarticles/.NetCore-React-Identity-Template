import React, { useEffect } from 'react';
import { Label, Button, Input, Form, Row, Col, FormGroup, FormFeedback } from 'reactstrap';
import { useForm } from '../../../utils/useForm';
import { useStatusMessage } from '../statusMessage';
import { useAccount } from '../useAccount';

const ChangePassword = props => {

    const [Status, setStatus] = useStatusMessage();
    const { ChangePassword } = useAccount();

    const initModel = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };
    const pwForm = useForm(initModel);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        pwForm.clearErrors();

        if (pwForm.model.newPassword === pwForm.model.confirmPassword) {

            ChangePassword(pwForm.model)
                .then(resp => {
                    if (!!resp && !!resp.status) {
                        setStatus(resp.status, resp.alertColor);
                    }
                    else {
                        pwForm.handleErrors(resp);
                    }
                });
        }
        else {
            setStatus('New Password and Confirm Password do not match.', 'danger');
        }
    };

    useEffect(() => {

        if (!!pwForm.errors.ModelErrors) {
            setStatus(pwForm.errors.ModelErrors, 'danger');
        }

    }, [pwForm.errors.ModelErrors]);

    return (
        <>
            <h4>Change password</h4>
            <Status />
            <Row>
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="oldPassword">Old Password</Label>
                            <Input type="password" name="oldPassword" value={pwForm.model.oldPassword} invalid={!!pwForm.errors.OldPassword} onChange={pwForm.onPropChanged} />
                            <FormFeedback>{pwForm.errors.OldPassword}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="newPassword">New Password</Label>
                            <Input type="password" name="newPassword" value={pwForm.model.newPassword} invalid={!!pwForm.errors.NewPassword} onChange={pwForm.onPropChanged} />
                            <FormFeedback>{pwForm.errors.NewPassword}</FormFeedback>
                        </FormGroup>       
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input type="password" name="confirmPassword" value={pwForm.model.confirmPassword} invalid={!!pwForm.errors.ConfirmPassword} onChange={pwForm.onPropChanged} />
                            <FormFeedback>{pwForm.errors.ConfirmPassword}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Button color='primary'>Update password</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default ChangePassword;