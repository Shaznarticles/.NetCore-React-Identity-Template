import React from 'react';
import { Link } from 'react-router-dom';

const ResetPasswordConfirmation = props => {


    return (
        <>
            <h1>Reset password confirmation</h1>
            <p>
                Your password has been reset. Please <Link to="/Account/Login">click here to log in</Link>.
            </p>
        </>
    );
};

export default ResetPasswordConfirmation;