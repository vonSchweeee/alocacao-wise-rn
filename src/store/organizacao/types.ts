import Organizacao from "../../models/Organizacao";

//Action Types
export const SET_ALOCACOES = 'SET_ALOCACOES';
export const SET_DATE = 'SET_DATE';
export const SET_SALAS = 'SET_SALAS';
export const SET_SALA = 'SET_SALA';
export const SALA_CREATED = 'SALA_CREATED';
export const SALA_UPDATED = 'SALA_UPDATED';
export const SALA_DELETED = 'SALA_DELETED';
export const SET_ORG_USERS = 'SET_ORG_USERS';
export const SET_ORG = 'SET_ORG';
export const CREATE_ORG = 'CREATE_ORG';
export const CLEAR_TEMP = 'CLEAR_TEMP';

export type SetSalaAction = {
    type: typeof SET_SALA,
    payload: string
}

export type CreateSalasAction = any;

export type SetUsuariosAction = {
    type: typeof SET_ORG_USERS,
    payload: object
}

export type SetOrganizacaoAction = {
    type: typeof SET_ORG,
    payload: {
         organizacao: Organizacao,
         path: string
    }
}

export type SetDateAction = {
    type: typeof SET_DATE;
    payload: string;
}

export type OrganizacaoState = {
    usuarios: object;
    data: Organizacao;
    path: string;
    idSala: string;
    date: string;
}

export type OrganizacaoActionTypes = SetSalaAction | SetUsuariosAction | SetOrganizacaoAction | SetDateAction;