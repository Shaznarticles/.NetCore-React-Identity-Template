import React from 'react';
import { Route } from 'react-router';
import * as Mng from './';

const Manage = () => {

    return (
        <Mng.ManageLayout>
            <Route exact path='/Account/Manage' component={Mng.ManageIndex} />
            <Route exact path='/Account/Manage/ChangePassword' component={Mng.ChangePassword} />
            <Route exact path='/Account/Manage/DeletePersonalData' component={Mng.DeletePersonalData} />
            <Route exact path='/Account/Manage/Disable2fa' component={Mng.Disable2fa} />
            <Route exact path='/Account/Manage/DownloadPersonalData' component={Mng.DownloadPersonalData} />
            <Route exact path='/Account/Manage/Email' component={Mng.Email} />
            <Route exact path='/Account/Manage/EnableAuthenticator' component={Mng.EnableAuthenitcator} />
            <Route exact path='/Account/Manage/ExternalLogins' component={Mng.ExternalLogins} />
            <Route exact path='/Account/Manage/GenerateRecoveryCodes' component={Mng.GenerateRecoveryCodes} />
            <Route exact path='/Account/Manage/PersonalData' component={Mng.PersonalData} />
            <Route exact path='/Account/Manage/ResetAuthenticator' component={Mng.ResetAuthenticator} />
            <Route exact path='/Account/Manage/SetPassword' component={Mng.SetPassword} />
            <Route exact path='/Account/Manage/ShowRecoveryCodes' component={Mng.ShowRecoveryCodes} />
            <Route exact path='/Account/Manage/TwoFactorAuthentication' component={Mng.TwoFactorAuthentication} />
        </Mng.ManageLayout>
    );
};

export default Manage;