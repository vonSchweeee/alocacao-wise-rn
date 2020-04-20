import { UserActionTypes, USER_SET, LOGOUT, USER_UPDATED } from "../types";

const initialState = {data: null, admin: false}
export default (state = initialState, action: UserActionTypes) => {
    switch(action.type){
        case USER_SET:
            return {...state, data: action.payload.user, admin: action.payload.admin, uuid: action.payload.uuid};
        case USER_UPDATED:
            return {...state, data: action.payload};
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}