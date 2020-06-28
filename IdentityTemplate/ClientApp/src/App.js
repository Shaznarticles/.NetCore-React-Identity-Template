import React, { Component } from 'react';
import { Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Account from './components/account';

import './custom.css'

export const App = props => {

    const { location } = props;
        
    return (
        <Layout>
            <Route exact path='/' component={Home} />

            <Route path='/Account' component={Account} />

            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
        </Layout>
    );
}

export default withRouter(App);
