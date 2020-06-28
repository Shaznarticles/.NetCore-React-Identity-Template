import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const ManageNav = props => {

    const { hasExternalLogins } = props;

    return (
        <>
            <ul className="nav nav-pills flex-column">
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/Account/Manage">Profile</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/Account/Manage/Email">Email</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/Account/Manage/ChangePassword">Change Password</NavLink>
                </NavItem>
                {(hasExternalLogins) &&
                    (
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/Account/Manage/ExternalLogins">External logins</NavLink>
                        </NavItem>
                    )
                }
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/Account/Manage/TwoFactorAuthentication">Two Factor Authentication</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/Account/Manage/PersonalData">Personal Data</NavLink>
                </NavItem>
            </ul>
        </>
    );
};

export default ManageNav;
