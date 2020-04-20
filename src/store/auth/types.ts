//Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SET_AUTH = 'SET_AUTH';
export const SET_NOT_AUTH = 'SET_NOT_AUTH';

export type AuthState = {
    auth: 'checking' | 'true' | 'false';
}


export interface LogoutAction {
    type: typeof LOGOUT
}

export interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS
}

export interface SetAuthAction {
    type: typeof SET_AUTH
}
export interface SetNotAuthAction {
    type: typeof SET_NOT_AUTH
}

export type AuthActionTypes = LogoutAction | LoginSuccessAction | SetAuthAction | SetNotAuthAction;