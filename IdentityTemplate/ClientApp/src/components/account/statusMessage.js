import React, { useState, useEffect, useReducer } from 'react';
import { Alert, Fade } from 'reactstrap';


export const useStatusMessage = () => {

    const initState = {
        statusTxt: '',
        color: 'success',
        timeout: 5000
    };

    function statusReducer(state, action) {
        switch (action.type) {
            case 'setStatus':
                return {
                    ...state,
                    statusTxt: action.status,
                    color: action.color,
                    timeout: action.timeout
                };            
            case 'clearStatus':
                return {
                    ...state,
                    statusTxt: ''
                };
            default:
                return state;
        }
    };

    const [statusData, dispatchStatus] = useReducer(statusReducer, initState);

    const clearStatus = () => {
        dispatchStatus({ type: 'clearStatus' })
    };

    const setStatus = (status, color, timeout) => {
        if (typeof color === 'undefined') color = 'success';
        if (typeof timeout === 'undefined') timeout = 5000;

        dispatchStatus({type:'setStatus', status, color, timeout})
    }


    const Status = props => {

        const { className, ...otherProps } = props;

        const { statusTxt, color, timeout } = statusData;

        const [fadeIn, setFadeIn] = useState(false);
        const [show, setShow] = useState(false);

        const onFadedOut = () => {
            setShow(false);
        };

        useEffect(() => {

            var timer;

            if (!!statusTxt) {

                setShow(true);
                setFadeIn(true);

                timer = setTimeout(() => {
                    setFadeIn(false);
                    clearStatus();
                }, timeout);
            }

            return () => clearTimeout(timer);
        }, [statusTxt]);

        return (
            <div>
                {(show) && (
                    <Fade in={fadeIn} onExited={onFadedOut}>
                        <Alert color={color || 'info'} className={className} {...otherProps}>
                            {statusTxt}
                        </Alert>
                    </Fade>
                )}
            </div>
        );
    };    

    return [Status, setStatus];
}