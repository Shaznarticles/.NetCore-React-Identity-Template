import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Row, Col, FormGroup } from 'reactstrap';
import { useAccount } from '../useAccount';

const PersonalData = props => {

    const history = useHistory();

    const { DownloadPersonalData } = useAccount();

    const download = () => {
        DownloadPersonalData();            
    };

    const deleteAuth = () => {
        history.push('/Account/Manage/DeletePersonalData');
    };

    return (
        <>
            <h4>Personal Data</h4>

            <Row>
                <Col md={6}>
                    <p>Your account contains personal data that you have given us. This page allows you to download or delete that data.</p>
                    <p>
                        <strong>Deleting this data will permanently remove your account, and this cannot be recovered.</strong>
                    </p>
                    <FormGroup>
                        <Button color="primary" onClick={download}>Download</Button>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" onClick={deleteAuth}>Delete</Button>
                    </FormGroup>
                </Col>
            </Row>
        </>
    );
};

export default PersonalData;