import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { useForm } from '../../utils/useForm';
import { useStatusMessage } from './statusMessage';
import { useAccount } from './useAccount';

const getQueryObject = () => {
    let queryObj = {};
    var query = window.location.search.substring(1);

    var vars = query.split("&");

    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        queryObj = { ...queryObj, [pair[0]]: pair[1] };
    }
    return queryObj;
};

const ResetPassword = props => {

    const history = useHistory();

    const code = getQueryObject().code;

    const [Status, setStatus] = useStatusMessage();
    const { ResetPassword } = useAccount();
        
    const initModel = {
        code: code,
        email: '',
        password: '',
        confirmPassword: ''
    };
    const pwForm = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        pwForm.clearErrors();

        ResetPassword(pwForm.model)
            .then(resp => {
                if (!!resp && !!resp.pathname) {
                    history.push(resp);
                }
                else {
                    pwForm.handleErrors(resp);
                }
            });
    };

    useEffect(() => {

        if (!!pwForm.errors.ModelErrors) {
            setStatus(pwForm.errors.ModelErrors, 'danger');
        }

    }, [pwForm.errors.ModelErrors]);

    return (
        <>
            <h1>Reset Password</h1>
            <Status />
            <h4>Reset your password.</h4>
            <hr />
            <Row>
                <Col md={4}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="text" name="email" value={pwForm.model.email} invalid={!!pwForm.errors.Email} onChange={pwForm.onPropChanged} />
                            <FormFeedback>{pwForm.errors.Email}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" value={pwForm.model.password} invalid={!!pwForm.errors.Password} onChange={pwForm.onPropChanged} />
                            <FormFeedback>{pwForm.errors.Password}</FormFeedback>
                        </FormGroup> 
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input type="password" name="confirmPassword" value={pwForm.model.confirmPassword} invalid={!!pwForm.errors.ConfirmPassword} onChange={pwForm.onPropChanged} />
                            <FormFeedback>{pwForm.errors.ConfirmPassword}</FormFeedback>
                        </FormGroup>  
                        <FormGroup>
                            <Button color='primary'>Reset</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default ResetPassword;