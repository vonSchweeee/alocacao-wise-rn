import {TOAST_SUCCESS, TOAST_ERROR, TOAST_CLEAR, SIDEBAR_HIDE, SIDEBAR_SHOW, UiActionTypes} from '../types';
import { Dispatch } from 'redux';

export const showSuccessToast = (message: string, timeout?: number) => {
    return (dispatch: Dispatch<UiActionTypes>) => {
      dispatch({ type: TOAST_SUCCESS, payload: {message, timeout} });
    };
};

export const showErrorToast = (message: string, timeout?: number) => {
    return (dispatch: Dispatch<UiActionTypes>) => {
      dispatch({ type: TOAST_ERROR, payload: {message, timeout} });
    };
};

export const clearToast = () => {
    return (dispatch: Dispatch<UiActionTypes>) => {
        dispatch({ type: TOAST_CLEAR });
    };
};

export const showSidebar = () => {
    return (dispatch: Dispatch<UiActionTypes>) => {
        dispatch({type: SIDEBAR_SHOW})
    }
}

export const hideSidebar = () => {
    return (dispatch: Dispatch<UiActionTypes>) => {
        dispatch({type: SIDEBAR_HIDE})
    }
}