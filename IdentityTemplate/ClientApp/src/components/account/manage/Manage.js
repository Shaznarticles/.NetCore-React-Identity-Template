import React from 'react';
import * as Mng from './';
import AuthorizedRoute from '../../../AuthorizedRoute';

const Manage = () => {

    return (
        <Mng.ManageLayout>
            <AuthorizedRoute exact path='/Account/Manage' component={Mng.ManageIndex} />
            <AuthorizedRoute exact path='/Account/Manage/ChangePassword' component={Mng.ChangePassword} />
            <AuthorizedRoute exact path='/Account/Manage/DeletePersonalData' component={Mng.DeletePersonalData} />
            <AuthorizedRoute exact path='/Account/Manage/Disable2fa' component={Mng.Disable2fa} />
            <AuthorizedRoute exact path='/Account/Manage/DownloadPersonalData' component={Mng.DownloadPersonalData} />
            <AuthorizedRoute exact path='/Account/Manage/Email' component={Mng.Email} />
            <AuthorizedRoute exact path='/Account/Manage/EnableAuthenticator' component={Mng.EnableAuthenitcator} />
            <AuthorizedRoute exact path='/Account/Manage/ExternalLogins' component={Mng.ExternalLogins} />
            <AuthorizedRoute exact path='/Account/Manage/GenerateRecoveryCodes' component={Mng.GenerateRecoveryCodes} />
            <AuthorizedRoute exact path='/Account/Manage/PersonalData' component={Mng.PersonalData} />
            <AuthorizedRoute exact path='/Account/Manage/ResetAuthenticator' component={Mng.ResetAuthenticator} />
            <AuthorizedRoute exact path='/Account/Manage/SetPassword' component={Mng.SetPassword} />
            <AuthorizedRoute exact path='/Account/Manage/ShowRecoveryCodes' component={Mng.ShowRecoveryCodes} />
            <AuthorizedRoute exact path='/Account/Manage/TwoFactorAuthentication' component={Mng.TwoFactorAuthentication} />
        </Mng.ManageLayout>
    );
};

export default Manage;