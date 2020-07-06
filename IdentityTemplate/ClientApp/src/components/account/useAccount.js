import Api from '../../api';

export const useAccount = () => {
        
    const GetExternalLogins = async () => {

        return new Promise((resolve, reject) => {

            Api.get('api/Account/ExternalLogins')
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));

        });
    };

    const HasPassword = async () => {
        return new Promise((resolve, reject) => {

            Api.post('api/Account/HasPassword', {})
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));

        });
    };

    const Register = async (registerObj) => {

        return new Promise((resolve, reject) => {

            Api.post('api/Account/Register', registerObj)
                .then(resp => {     
                    resolve(resp.data);
                })
                .catch(err => reject(err));

        });
    };

    const Login = async (loginObj) => {

        return new Promise((resolve, reject) => {
            //console.log(loginObj);
            Api.post('api/Account/Login', loginObj)
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const Logout = async (returnUrl) => {

        return new Promise((resolve, reject) => {

            Api.post('api/Account/Logout', { returnUrl: returnUrl })
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const UpdateProfile = async (profileObj) => {

        return new Promise((resolve, reject) => {

            Api.post('api/Account/ManageProfile', profileObj)
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };



    const GetSignedInUser = async () => {
        return new Promise((resolve, reject) => {
            Api.post('api/Account/SignedInUser', {})
                .then(resp => {
                    //console.log(resp.data);
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const IsEmailConfirmed = async () => {
        return new Promise((resolve, reject) => {
            Api.post('api/Account/EmailConfirmed', {})
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const SendEmailVerification = async () => {
        return new Promise((resolve, reject) => {
            Api.post('api/Account/SendEmailVerification', {})
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const ChangeEmail = async (emailObj) => {
        return new Promise((resolve, reject) => {
            Api.post('api/Account/ChangeEmail', emailObj)
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    }

    const ChangePassword = async (pwObj) => {
        return new Promise((resolve, reject) => {
            Api.post('api/Account/ChangePassword', pwObj)
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const ForgotPassword = async (emailObj) => {
        return new Promise((resolve, reject) => {
            Api.post('api/Account/ForgotPassword', emailObj)
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const LoginWith2fa = async (loginObj) => {
        return new Promise((resolve, reject) => {
            Api.post('api/Account/LoginWith2fa', loginObj)
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const LoginWithRecoveryCode = async (loginObj) => {
        return new Promise((resolve, reject) => {
            Api.post('api/Account/LoginWithRecoveryCode', loginObj)
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const ResendEmailConfirmation = async (emailObj) => {
        return new Promise((resolve, reject) => {
            Api.post('api/Account/ResendEmailConfirmation', emailObj)
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const ResetPassword = async (resetObj) => {
        return new Promise((resolve, reject) => {
            Api.post('api/Account/ResetPassword', resetObj)
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const DeletePersonalData = async (delObj) => {
        return new Promise((resolve, reject) => {
            Api.post('api/Account/DeletePersonalData', delObj)
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const TwoFactorEnabled = async () => {
        return new Promise((resolve, reject) => {
            Api.get('api/Account/TwoFactorEnabled')
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const HasAuthenticator = async () => {
        return new Promise((resolve, reject) => {
            Api.get('api/Account/HasAuthenticator')
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const IsMachineRemembered = async () => {
        return new Promise((resolve, reject) => {
            Api.get('api/Account/IsMachineRemembered')
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const RecoveryCodesLeft = async () => {
        return new Promise((resolve, reject) => {
            Api.get('api/Account/RecoveryCodesLeft')
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const ForgetBrowser = async () => {
        return new Promise((resolve, reject) => {
            Api.post('api/Account/ForgetBrowser', {})
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const LoadSharedKeyAndQRCodeUri = async () => {
        return new Promise((resolve, reject) => {
            Api.get('api/Account/LoadSharedKeyAndQRCodeUri')
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const Verify2FACode = async (codeObj) => {
        return new Promise((resolve, reject) => {
            Api.post('api/Account/Verify2FACode', codeObj)
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const ResetAuthenticator = async () => {
        return new Promise((resolve, reject) => {
            Api.post('api/Account/ResetAuthenticator', {})
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const GenerateRecoveryCodes = async () => {
        return new Promise((resolve, reject) => {
            Api.post('api/Account/GenerateRecoveryCodes', {})
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const Disable2fa = async () => {
        return new Promise((resolve, reject) => {
            Api.post('api/Account/Disable2fa', {})
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => reject(err));
        });
    };

    const DownloadPersonalData = () => {
        window.location = '/api/Account/DownloadPersonalData';               
    };


    return {
        GetExternalLogins, HasPassword, Register, Login,
        Logout, UpdateProfile, GetSignedInUser, IsEmailConfirmed,
        SendEmailVerification, ChangeEmail, ChangePassword,
        ForgotPassword, LoginWith2fa, LoginWithRecoveryCode,
        ResendEmailConfirmation, ResetPassword, DeletePersonalData,
        TwoFactorEnabled, HasAuthenticator, IsMachineRemembered, RecoveryCodesLeft,
        ForgetBrowser, LoadSharedKeyAndQRCodeUri, Verify2FACode, ResetAuthenticator,
        GenerateRecoveryCodes, Disable2fa, DownloadPersonalData
    };
};