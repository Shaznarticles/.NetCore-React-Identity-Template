import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Label, Button, Input, Form, Row, Col, FormGroup, Container } from 'reactstrap';
import { useForm } from '../../../utils/useForm';
import UserContext from '../../../auth/user';
import { useAccount } from '../useAccount';

const DeletePersonalData = props => {

    const history = useHistory();

    const { getSignedInUser } = useContext(UserContext);

    const [requirePassword, setRequirePassword] = useState(true);

    const { HasPassword, DeletePersonalData } = useAccount();

    const initModel = {
        password: ''
    };

    const { model, onPropChanged } = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        DeletePersonalData(model)
            .then(resp => {
                if (!!resp && !!resp.pathname) {
                    getSignedInUser();

                    history.push(resp);
                }
                else {
                    console.log('Model State Errors:');
                    console.log(resp);
                }
            });
    };

    useEffect(() => {

        HasPassword()
            .then(resp => {
                setRequirePassword(resp);
            });

    }, []);

    return (
        <>
            <h4>Delete Personal Data</h4>

            <div className="alert alert-warning" role="alert">
                <p>
                    <strong>Deleting this data will permanently remove your account, and this cannot be recovered.</strong>
                </p>
            </div>

            <div>
                <Form onSubmit={handleSubmit}>
                    {(requirePassword) &&
                        (
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" value={model.password} onChange={onPropChanged} />
                            </FormGroup>
                        )
                    }
                    <Button color='danger'>Delete data and close my account</Button>
                </Form>
            </div>
        </>
    );
};

export default DeletePersonalData;