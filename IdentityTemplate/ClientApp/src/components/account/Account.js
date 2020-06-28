import React from 'react';
import { Route } from 'react-router';
import * as Acct from './';
import Manage from './manage';

const Account = () => {

    return (
        <>
            <Route path='/Account/Manage' component={Manage} />
            <Route exact path='/Account/Login' component={Acct.Login} />
            <Route exact path='/Account/Register' component={Acct.Register} />
            <Route exact path='/Account/Logout' component={Acct.Logout} />
            <Route exact path='/Account/RegisterConfirmation' component={Acct.RegisterConfirmation} />
            <Route exact path='/Account/ConfirmEmail' component={Acct.ConfirmEmail} />
            <Route exact path='/Account/ConfirmEmailChange' component={Acct.ConfirmEmailChange} />
            <Route exact path='/Account/ForgotPassword' component={Acct.ForgotPassword} />
            <Route exact path='/Account/ForgotPasswordConfirmation' component={Acct.ForgotPasswordConfirmation} />
            <Route exact path='/Account/AccessDenied' component={Acct.AccessDenied} />
            <Route exact path='/Account/Lockout' component={Acct.Lockout} />
            <Route exact path='/Account/LoginWith2fa' component={Acct.LoginWith2fa} />
            <Route exact path='/Account/LoginWithRecoveryCode' component={Acct.LoginWithRecoveryCode} />
            <Route exact path='/Account/ResendEmailConfirmation' component={Acct.ResendEmailConfirmation} />
            <Route path='/Account/ResetPassword' component={Acct.ResetPassword} />
            <Route exact path='/Account/ResetPasswordConfirmation' component={Acct.ResetPasswordConfirmation} />
        </>
    );
};

export default Account;