import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';


const RegisterConfirmation = props => {

    const location = useLocation();
    const history = useHistory();
        
    if (!!location.state) {

        const { email, emailConfirmationUrl } = location.state;

        if (!email) history.push('/');

        //// Once you add a real email sender, you should remove this code that lets you confirm the account
        const displayConfirmationAccountLink = true;

        return (
            <>
                <h1>Register confirmation</h1>
                {(displayConfirmationAccountLink && !!emailConfirmationUrl) ?
                    (
                        <p>
                            This app does not currently have a real email sender registered, see <a href="https://aka.ms/aspaccountconf">these docs</a> for how to configure a real email sender.
                        Normally this would be emailed: <a id="confirm-link" href={emailConfirmationUrl}>Click here to confirm your account</a>
                        </p>
                    ) : (
                        <p>
                            Please check your email to confirm your account.
                        </p>
                    )
                }
            </>
        );
    }
    else {
        history.push('/');

        return (<></>);
    }
};

export default RegisterConfirmation;