import { CLEAR_TEMP, AUTH_FAILED, ACTION_SUCCESS, ACTION_FAILURE, ACTION_RESET, SET_SALAS } from "../types";
import Sala from "../../../models/Sala";

export const clear = () => {
    return {
        type: CLEAR_TEMP
    }
}

export const authFailed = () => {
    return {
        type: AUTH_FAILED,
        payload: true
    }
}

export const resetAuthFailed = () => {
    return {
        type: AUTH_FAILED,
        payload: false
    }
}

export const actionSuccess = () => {
    return {
        type: ACTION_SUCCESS
    }
}

export const actionFailure = () => {
    return {
        type: ACTION_FAILURE
    }
}

export const actionReset = () => {
    return {
        type: ACTION_RESET
    }
}

export const setSalas = (salas: Sala[]) => {
    return {
        type: SET_SALAS,
        payload: salas
    }
}