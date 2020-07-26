import React, { useState, useEffect } from 'react';
import { Alert, Fade } from 'reactstrap';

export const StatusMessage = props => {

    const { connector, className, ...otherProps } = props;

    const { message, setMessage, color, timeout } = connector;

    const [fadeIn, setFadeIn] = useState(false);
    const [show, setShow] = useState(false);

    const onFadedOut = () => {
        setShow(false);
    };

    useEffect(() => {

        const timer = setTimeout(() => {
            setFadeIn(false);
            if (!!setMessage) setMessage('');
        }, timeout);

        if (!!message) {

            setShow(true);
            setFadeIn(true);                       
        }

        return () => clearTimeout(timer);
    }, [message]);

    return (
        <>
            {(show) && (
                <Fade in={fadeIn} onExited={onFadedOut}>
                    <Alert color={color || 'info'} className={className} {...otherProps}>
                        {message}
                    </Alert>
                </Fade>
            )}
        </>
    );
};

export const useStatusMessage = () => {

    const [messageTxt, setMessageTxt] = useState('');
    const [color, setColor] = useState('success');
    const [timeout, setTimeout] = useState(5000);

    const setMessage = (message, color, timeout) => {
        if (typeof color === 'undefined') color = 'success';
        if (typeof timeout === 'undefined') timeout = 5000;

        setColor(color);
        setTimeout(timeout);

        setMessageTxt(message);
    }

    const connector = { message: messageTxt, setMessage: setMessageTxt, color, timeout };

    return [setMessage, connector];
}