import { SET_ORG_USERS, SET_ORG, OrganizacaoActionTypes, OrganizacaoState } from "../types";
import { LOGOUT, UserActionTypes } from "../../user/types";
import { SET_SALA, SET_DATE } from "../types";

const initialState: OrganizacaoState = {usuarios: [], data: {}, path: '', idSala: '', date: ''}

export default (state = initialState, action: OrganizacaoActionTypes | UserActionTypes) => {
    switch(action.type){
        case SET_ORG_USERS:
            return {...state, usuarios: action.payload};
        case SET_ORG:
            return {...state, data: action.payload.organizacao, path: action.payload.path};
        case SET_SALA:
            return {...state, idSala: action.payload};
        case SET_DATE:
            return {...state, date: action.payload}
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}