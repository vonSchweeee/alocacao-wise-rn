import { CLEAR_TEMP, SET_DATE, SET_ALOCACOES } from "../types";

export default (state = {}, action: any) => {
    switch(action.type){
        case SET_ALOCACOES:
            return {...state, alocacoes: action.payload};
        case SET_DATE:
            return {...state, data: action.payload};
        case CLEAR_TEMP:
            return {};
        default:
            return state;
    }
}