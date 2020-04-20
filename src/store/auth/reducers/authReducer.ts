import { LOGOUT, LOGIN_SUCCESS, AuthActionTypes, AuthState, SET_AUTH, SET_NOT_AUTH } from "../types";

const initialState: AuthState = { auth: 'checking'};

export default (state = initialState, action: AuthActionTypes) => {
    switch(action.type){
        case LOGIN_SUCCESS:
            return {auth: 'true'}
        case LOGOUT:
            return {auth: 'false'};
        case SET_AUTH:
            return {auth: 'true'}
        case SET_NOT_AUTH:
            return {auth: 'false'}
        default:
            return state;
    }
}