import { SET_ALOCACOES, SET_DATE } from "../types";

export function setAlocacoes(alocacoes: any){
    return (dispatch: any) => {
        dispatch({type: SET_ALOCACOES, payload: alocacoes})
    }
}

export function setDate(data: any){
    return (dispatch: any) => {
        dispatch({type: SET_DATE, payload: data});
    }
}