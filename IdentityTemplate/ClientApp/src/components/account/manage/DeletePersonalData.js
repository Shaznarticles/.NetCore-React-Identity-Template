﻿import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Label, Button, Input, Form, FormGroup, FormFeedback } from 'reactstrap';
import { useForm } from '../../../utils/useForm';
import { useStatusMessage } from '../statusMessage';
import UserContext from '../../../auth/user';
import { useAccount } from '../useAccount';

const DeletePersonalData = props => {

    const history = useHistory();

    const [requirePassword, setRequirePassword] = useState(true);
    const { getSignedInUser } = useContext(UserContext);

    const [Status, setStatus] = useStatusMessage();
    const { HasPassword, DeletePersonalData } = useAccount();

    const initModel = {
        password: ''
    };
    const pDataForm = useForm(initModel);

    const handleSubmit = (e) => {
        e.preventDefault();

        pDataForm.clearErrors();

        DeletePersonalData(pDataForm.model)
            .then(resp => {
                if (!!resp && !!resp.pathname) {
                    getSignedInUser();

                    history.push(resp);
                }
                else {
                    pDataForm.handleErrors(resp);
                }
            });
    };

    useEffect(() => {

        HasPassword()
            .then(resp => {
                setRequirePassword(resp);
            });

    }, []);

    useEffect(() => {

        if (!!pDataForm.errors.ModelErrors) {
            setStatus(pDataForm.errors.ModelErrors, 'danger');
        }

    }, [pDataForm.errors.ModelErrors]);

    return (
        <>
            <h4>Delete Personal Data</h4>
            <Status />

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
                            <Input type="password" name="password" value={pDataForm.model.password} invalid={!!pDataForm.errors.Password} onChange={pDataForm.onPropChanged} />
                            <FormFeedback>{pDataForm.errors.Password}</FormFeedback>
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