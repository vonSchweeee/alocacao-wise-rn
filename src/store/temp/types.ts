import Sala from "../../models/Sala";

//Action Types
export const SET_ALOCACOES = 'SET_ALOCACOES';
export const SET_DATE = 'SET_DATE';
export const SET_SALAS = 'SET_SALAS';
export const SET_ORG_USERS = 'SET_ORG_USERS';
export const CREATE_ORG = 'CREATE_ORG';
export const CLEAR_TEMP = 'CLEAR_TEMP';
export const AUTH_FAILED = 'AUTH_FAILED';
export const ACTION_SUCCESS = 'ACTION_SUCCESS';
export const ACTION_FAILURE = 'ACTION_FAILURE';
export const ACTION_RESET = 'ACTION_RESET';

export interface SetSalasAction {
    type: typeof SET_SALAS,
    payload: Sala[]
}

export type TempState = {
    authFailed: boolean;
    action: 'none' | 'success' | 'fail';
    salas: Sala[]
}