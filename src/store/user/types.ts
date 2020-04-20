import Usuario from '../../models/Usuario';

//ActionTypes
export const USER_SET = 'USER_SET';
export const LOGOUT = 'LOGOUT';
export const USER_UPDATED = 'USER_UPDATE';


export type UserState = { 
    data: Usuario;
    admin: boolean;
};

export interface SetUserAction {
    type: typeof USER_SET;
    payload: {
        user: Usuario;
        admin: boolean;
        uuid: string;
    }
}

export interface LogoutAction {
    type: typeof LOGOUT;
}
export interface ChangePropicAction {
    type: typeof USER_UPDATED;
    payload: Usuario;
}

export type UserActionTypes = SetUserAction | LogoutAction | ChangePropicAction;