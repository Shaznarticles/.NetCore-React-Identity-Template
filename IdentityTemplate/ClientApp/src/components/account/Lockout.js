import React from 'react';

const Lockout = props => {


    return (
        <header>
            <h1 className="text-danger">Locked out</h1>
            <p className="text-danger">This account has been locked out, please try again later.</p>
        </header>
    );
};

export default Lockout;