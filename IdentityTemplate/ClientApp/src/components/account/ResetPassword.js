import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { useForm } from '../../utils/useForm';
import { StatusMessage, useStatusMessage } from './statusMessage';
import { useAccount } from './useAccount';
import { useLocation, useHistory } from 'react-router-dom';

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

    const location = useLocation();
    const history = useHistory();

    const code = getQueryObject().code;

    const [setMessage, statMsgConnector] = useStatusMessage();
    
    const initModel = {
        code: code,
        email: '',
        password: '',
        confirmPassword: ''
    };

    const { model, onPropChanged, handleErrors, errors, clearErrors } = useForm(initModel);

    const { ResetPassword } = useAccount();

    const handleSubmit = (e) => {
        e.preventDefault();

        clearErrors();

        ResetPassword(model)
            .then(resp => {
                if (!!resp && !!resp.pathname) {
                    history.push(resp);
                }
                else {
                    handleErrors(resp);
                }
            });
    };

    useEffect(() => {

        if (!!errors.ModelErrors) {
            setMessage(errors.ModelErrors, 'danger');
        }

    }, [errors.ModelErrors]);

    return (
        <>
            <h1>Reset Password</h1>
            <StatusMessage connector={statMsgConnector} />
            <h4>Reset your password.</h4>
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
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" value={model.password} invalid={!!errors.Password} onChange={onPropChanged} />
                            <FormFeedback>{errors.Password}</FormFeedback>
                        </FormGroup> 
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input type="password" name="confirmPassword" value={model.confirmPassword} invalid={!!errors.ConfirmPassword} onChange={onPropChanged} />
                            <FormFeedback>{errors.ConfirmPassword}</FormFeedback>
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