import { AUTH_FAILED , ACTION_SUCCESS, TempState, ACTION_FAILURE, ACTION_RESET, SET_SALAS} from "../types";
import { LOGOUT } from "../../auth/types";

const initialState: TempState = {
    authFailed: false,
    action: 'none',
    salas: []
}

export default (state = initialState, action: any) => {
    switch(action.type){
        case AUTH_FAILED:
            return {...state, authFailed: action.payload};
        case ACTION_SUCCESS:
            return {...state, action: 'success'}
        case ACTION_FAILURE:
            return {...state, action: 'fail'}
        case ACTION_RESET:
            return {...state, action: 'none'}
        case SET_SALAS:
            return {...state, salas: action.payload}
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}