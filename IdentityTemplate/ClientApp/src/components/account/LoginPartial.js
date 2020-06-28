import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import UserContext from '../../auth/user';
import { useAccount } from './useAccount';

const LoginPartial = props => {

    const { history } = props;
    const { userConfig, getSignedInUser } = useContext(UserContext);
    const { Logout } = useAccount();

    const logout = () => {
        Logout('/Account/Logout')
            .then(resp => {
                getSignedInUser();
                if (!!resp && !!resp.pathname) {
                    history.push(resp);
                }
            });
    };

    return (
        <>
            {(userConfig.signedIn) ?
                (
                    <>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/Account/Manage">{userConfig.user.email}</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={logout} tag={Link} to='/' className="text-dark">Logout</NavLink>
                        </NavItem>
                    </>
                ) : (
                    <>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/Account/Register">Register</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/Account/Login">Login</NavLink>
                        </NavItem>
                    </>
                )
            }
        </>
    );
}

export default LoginPartial;