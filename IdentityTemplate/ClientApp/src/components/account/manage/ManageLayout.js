import React from 'react';
import { Row, Col } from 'reactstrap';
import { ManageNav } from './';

const ManageAccountLayout = props => {

    const { children } = props;

    return (
        <>
            <h2>Manage your account</h2>

            <div>
                <h4>Change your account settings</h4>
                <hr />
                <Row>
                    <Col md={3}>
                        <ManageNav />
                    </Col>
                    <Col md={9}>
                        {children}
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default ManageAccountLayout;