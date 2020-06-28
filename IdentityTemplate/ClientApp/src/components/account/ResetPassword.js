import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useForm } from '../../utils/useForm';
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

    const { history, location } = props;

    const code = getQueryObject().code;


    const initModel = {
        code: code,
        email: '',
        password: '',
        confirmPassword: ''
    };

    const { model, onPropChanged } = useForm(initModel);

    const { ResetPassword } = useAccount();

    const handleSubmit = (e) => {
        e.preventDefault();
                
        ResetPassword(model)
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
            <h1>Reset Password</h1>
            <h4>Reset your password.</h4>
            <hr />
            <Row>
                <Col md={4}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="text" name="email" value={model.email} onChange={onPropChanged} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" value={model.password} onChange={onPropChanged} />
                        </FormGroup> 
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input type="password" name="confirmPassword" value={model.confirmPassword} onChange={onPropChanged} />
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