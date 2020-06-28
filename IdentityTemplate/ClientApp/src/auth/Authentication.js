import React, { useState,useEffect, useReducer } from 'react';
import UserContext from './user';
import { useAccount } from '../components/account/useAccount';

const useAuth = () => {

    const { GetSignedInUser } = useAccount();

    const initState = {
        signedIn: false,
        user: null
    }

    function userReducer(state, action) {
        switch (action.type) {
            case 'setUser':
                return { ...state, user: action.user, signedIn: !!action.user }            
            default:
                return state;
        }
    };

    const [userConfig, dispatchUser] = useReducer(userReducer, initState);

    const getSignedInUser = () => {
        GetSignedInUser()
            .then(resp => {
                if (!!resp) {
                    dispatchUser({ type: 'setUser', user: resp });
                }
                else {
                    dispatchUser({ type: 'setUser', user: null });
                }
            });
    };

    return { userConfig, getSignedInUser };
};

const Authentication = (props) => {

    const { children } = props;
    const { userConfig, getSignedInUser } = useAuth();

    useEffect(() => {

        const checkAuth = async () => {
            getSignedInUser();
        };

        checkAuth();

    }, []);

    return (
        <UserContext.Provider value={{ userConfig, getSignedInUser }}>
            {children}
        </UserContext.Provider>
    );    
};

export default Authentication;