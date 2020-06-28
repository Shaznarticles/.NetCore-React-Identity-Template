import React, { useState, useEffect, useReducer } from 'react';

export const useForm = (initObj) => {

    const modelObjReducer = (state, action) => {
        switch (action.type) {
            case 'setObject':
                return action.object;
            case 'setProp':
                return { ...state, [action.name]: action.value };
            case 'flipCheck':
                return { ...state, [action.name]: !state[action.name] };
            default:
                return state;
        }
    };

    const [modelState, dispatchModel] = useReducer(modelObjReducer, initObj);

    const errorsObjReducer = (state, action) => {
        switch (action.type) {
            case 'setErrorObject':
                return action.object;
            case 'addError':
                return { ...state, [action.prop]: action.value };
            case 'clearError':
                return { ...state, [action.prop]: '' };
            default:
                return state;
        }
    };

    const [errorState, dispatchErrors] = useReducer(errorsObjReducer, {});

    const onPropChanged = ({ target: { name, value } }) => {
        dispatchModel({ type: 'setProp', name, value });
    };

    const onCheckChanged = ({ target: { name } }) => {
        dispatchModel({ type: 'flipCheck', name });
    };

    const setModelProperty = (name, value) => {
        dispatchModel({ type: 'setProp', name, value });
    };

    const setObject = (object) => {
        dispatchModel({ type: 'setObject', object });
        setErrorObject(object);
    };

    const setErrorObject = (obj) => {
        var errObject = {};

        Object.keys(obj).forEach(prop => {
            errObject = { ...errObject, [prop]: '' };
        });

        dispatchErrors({ type: 'setErrorObject', object: errObject });
    };

    const clearErrors = () => {
        Object.keys(errorState).forEach(prop => {
            dispatchErrors({ type: 'clearError', prop });
        });
    };

    const handleErrors = (errModel) => {
        console.log(errModel);
    };

    useEffect(() => {

        const setInitErrors = () => {
            setErrorObject(initObj);            
        };

        setInitErrors();

    }, []);

    return { model: modelState, onPropChanged, onCheckChanged, setObject, setModelProperty, errors: errorState, clearErrors, handleErrors };
};