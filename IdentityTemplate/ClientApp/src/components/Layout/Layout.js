import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from '../NavMenu/NavMenu';

export const Layout = (props) => {

    const { children } = props;

    return (
        <div>
            <NavMenu />
            <Container>
                {children}
            </Container>
        </div>
    );
}
