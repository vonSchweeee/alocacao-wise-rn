import Organizacao from '../../../models/Organizacao';
import { SET_ORG_USERS, SET_ORG, SetOrganizacaoAction, SetSalaAction, SET_SALA, SET_DATE} from '../types';
import { showErrorToast, showSuccessToast } from '../../ui/actions/uiActions';
import { authenticate } from '../../auth/actions/authActions';
import Usuario from '../../../models/Usuario';
import { authFailed, resetAuthFailed, actionSuccess, actionFailure, actionReset} from '../../temp/actions/tempActions';
import Axios from 'axios';
import firebase from '../../../firebase';
import { Dispatch} from 'redux';
import Sala from '../../../models/Sala';
import Alocacao from '../../../models/Alocacao';
import moment from 'moment';
import {FirebaseError} from 'firebase';
import {loginSuccess} from '../../auth/actions/authActions';
import { Alert } from 'react-native';

export function setUsers(usuarios: Usuario){
    return {
        type: SET_ORG_USERS, 
        payload: usuarios
    }
}

export function createOrg(organizacao: Organizacao, dominio: string, user: Usuario, nomeOrg?: string){
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(resetAuthFailed());
            if(nomeOrg) {
                nomeOrg = nomeOrg.toLowerCase();
                nomeOrg = nomeOrg.replace(/ /g, '-');
            }
            dominio = dominio.replace(/\./g, '-');
            const resp = await firebase.auth().createUserWithEmailAndPassword(user.email, user.senha);
            const uuid = resp.user?.uid;
            if(uuid) {
                const response = await Axios.post('https://us-central1-alocacao-wise.cloudfunctions.net/createOrgWithAdm', {user, uuid, dominio, nomeOrg, organizacao});
                dispatch(showSuccessToast(response.data.msg || 'Organização e usuário cadastrados com sucesso!', 1200));
                setTimeout(() => {
                    dispatch(authenticate(user.email, user.senha));
                }, 350);
            }
        }
        catch(ex) {
            console.log(ex.response);
            dispatch(authFailed());
            if(ex.response.data.msg == typeof String)
                return dispatch(showErrorToast(ex.response.data.msg|| 'Falha ao registrar a organização!', 3500));
            else
                return dispatch(showErrorToast('Falha ao registrar a organização!', 3500));
        }
    }
}

export function setOrg(dominio: string, tipo: string, nome: string){
    return async (dispatch: Dispatch<SetOrganizacaoAction | any>) => {
        try {
            const res = await firebase.database().ref(`organizacoes/${dominio}/${tipo}/${nome}/data`).once('value');
            const organizacao: Organizacao = await res.val();
            dispatch({
                type: SET_ORG,
                payload: { 
                    organizacao,
                    path: `${dominio}/${tipo}/${nome}`
                }
            });
            return dispatch(loginSuccess());
        }
        catch {
            return dispatch(showErrorToast('Ocorreu um erro.', 60000));
        }
    };
}


export function editSala(sala: Sala, base64image: string) {
    return async (dispatch: Dispatch<any>, getState: any) => {
        try {
            if(base64image){
                try {
                    const res = await Axios.post('uploadImage', {image: base64image});
                    sala.urlImagem = res.data.imageUrl;
                    await firebase.database().ref(`organizacoes/${getState().organizacao.path}/salas/${sala.id}`).set(sala);
                    dispatch(showSuccessToast('Sala editada com sucesso!'));
                    return dispatch(actionSuccess());
                }
                catch(ex){
                    dispatch(showErrorToast('Falha ao editar sala.', 3500));
                    return dispatch(actionFailure());
                }
            }
            else {
                await firebase.database().ref(`organizacoes/${getState().organizacao.path}/salas/${sala.id}`).set(sala);
                dispatch(showSuccessToast('Sala editada com sucesso!', 2000));
                dispatch(actionSuccess());
            }
        }
        catch(ex){
            console.log(ex);
        }
    };
}

export function deleteSala(sala: Sala) {
    return async (dispatch: Dispatch<any>, getState: any) => {
        try {
            await firebase.database().ref(`organizacoes/${getState().organizacao.path}/salas/${sala.id}`).set({});
            dispatch(showSuccessToast('Sala removida com sucesso!', 2500));
            return dispatch(actionSuccess());
        }
        catch(ex){
            dispatch(showSuccessToast('Falha ao excluir sala.'));
            dispatch(actionFailure());
        }
    };
}

export function createSala(sala: Sala, base64image: string) {
    return async (dispatch: Dispatch<any>, getState: any) => {
        try {
            sala.id = sala.nome.replace(/ /g, '-').toLowerCase();
            if(base64image){
                try {
                    const res = await Axios.post('https://us-central1-alocacao-wise.cloudfunctions.net/uploadImage', {image: base64image});
                    sala.urlImagem = res.data.imageUrl;
                    await firebase.database().ref(`organizacoes/${getState().organizacao.path}/salas/${sala.id}`).set(sala);
                    dispatch(showSuccessToast('Sala adicionada com sucesso!'));
                    return dispatch(actionSuccess());
                }
                catch(ex){
                    dispatch(showErrorToast('Falha ao adicionar sala.', 3500));
                    return dispatch(actionFailure());
                }
            }
            else {
                try {
                    await firebase.database().ref(`organizacoes/${getState().organizacao.path}/salas/${sala.id}`).set(sala);
                    dispatch(showSuccessToast('Sala adicionada com sucesso!', 2000));
                    return dispatch(actionSuccess());
                }
                catch(ex){
                    dispatch(showErrorToast('Falha ao criar sala.', 3500));
                    return dispatch(actionFailure());
                }
            }
        }
        catch(ex){
            return console.log(ex);
        }
    };
}

export function setSala(sala?: Sala, idSalaP? : string){
    return (dispatch: Dispatch<SetSalaAction>) => {
        if(idSalaP){
            return dispatch({type: SET_SALA, payload: idSalaP});
        }
        if(sala){ 
            if(sala.id) {
            return dispatch({type: SET_SALA, payload: sala.id});
            }
        }
    };
}

export function criarAlocacao(alocacao: Alocacao, quantAlocacoes: number, arrayAlocacoesUnd?: Alocacao[]){
    return async (dispatch: Dispatch<any>, getState: Function) => {
        const arrayAlocacoes = arrayAlocacoesUnd || [];
        if (arrayAlocacoes) {
            // eslint-disable-next-line
            const conflito = arrayAlocacoes.find((aloc) => {
                if(alocacao.id !== aloc.id && aloc.ativo){
                    if(alocacao.inicio >= moment(aloc.inicio).toDate() &&  alocacao.inicio <= moment(aloc.fim).toDate()){
                        return aloc;
                    }
                    if(alocacao.fim >= moment(aloc.inicio).toDate() &&  alocacao.fim <= moment(aloc.fim).toDate()){
                        return aloc;
                    }
                    if(alocacao.inicio <= moment(aloc.inicio).toDate() && alocacao.fim >= moment(aloc.fim).toDate()){
                        return aloc;
                    }
                }
            });
            if(conflito){
                dispatch(showErrorToast(`Alocação conflita em horario com ${conflito.nome}!`));
                return dispatch(actionFailure());
            }
            else {
                try {
                    const uid = firebase.auth().currentUser?.uid;
                    if(uid) {
                        alocacao.uidUsuario = uid;
                        alocacao.inicio = moment(alocacao.inicio).format('YYYY-MM-DD HH:mm:ss');
                        alocacao.fim = moment(alocacao.fim).format('YYYY-MM-DD HH:mm:ss');
                        alocacao.id = quantAlocacoes;
                        const dataAlocacao = moment(alocacao.inicio).format('YYYY-MM-DD');  //O path é a quantidade de alocações pois elas são salvas como índice de array (-1)
                        const pathAlocacao = `organizacoes/${getState().organizacao.path}/salas/${getState().organizacao.idSala}/alocacoes/${dataAlocacao}/${quantAlocacoes}`;
                        await firebase.database().ref(pathAlocacao).set({...alocacao, createdAt: moment().toISOString() });
                        dispatch(showSuccessToast('Alocação realizada com sucesso!'));
                        return dispatch(actionSuccess());
                    }
                    else {
                        dispatch(showErrorToast('Erro ao realizar alocação!'));
                        return dispatch(actionFailure());
                    }
                }
                catch (e) {
                    const ex: FirebaseError = e;
                    console.log(ex);
                    dispatch(showErrorToast('Erro ao realizar alocação!'));
                    return dispatch(actionFailure());
                }
            }
        }
    }
}

export function editarAlocacao(alocacao: Alocacao, indiceAlocacao: number, arrayAlocacoes?: Alocacao[], edit?: boolean){
    return async (dispatch: Dispatch<any>, getState: Function) => {
        if (arrayAlocacoes) {
            // eslint-disable-next-line
            const conflito = arrayAlocacoes.find((aloc) => {
                if(alocacao.id !== aloc.id && aloc.ativo){
                    if(new Date(alocacao.inicio) >= new Date(aloc.inicio) &&  new Date(alocacao.inicio) <= new Date(aloc.fim)){
                        return aloc;
                    }
                    if(new Date(alocacao.fim) >= new Date(aloc.inicio) &&  new Date(alocacao.fim) <= new Date(aloc.fim)){
                        return aloc;
                    }
                    if(new Date(alocacao.inicio) <= new Date(aloc.inicio) && new Date(alocacao.fim) >= new Date(aloc.fim)){
                        return aloc;
                    }
                }
            });
            if(conflito){
                dispatch(showErrorToast(`Alocação conflita em horario com ${conflito.nome}!`));
                return dispatch(actionFailure());
            }
            else{
                try {
                    const uid = firebase.auth().currentUser?.uid; 
                    if (uid) {
                        alocacao.uidUsuario = uid;
                        alocacao.inicio = moment(alocacao.inicio).format('YYYY-MM-DD HH:mm:ss');
                        alocacao.fim = moment(alocacao.fim).format('YYYY-MM-DD HH:mm:ss');
                        const dataAlocacao = moment(alocacao.inicio).format('YYYY-MM-DD');
                        const pathAlocacao = `organizacoes/${getState().organizacao.path}/salas/${getState().organizacao.idSala}/alocacoes/${dataAlocacao}/${alocacao.id}`;
                        await firebase.database().ref(pathAlocacao).set(alocacao);
                        dispatch(showSuccessToast('Alocação editada com sucesso!'));
                        return dispatch(actionSuccess());
                    }
                }
                catch (e) {
                    const ex: FirebaseError = e;
                    console.log(ex);
                    dispatch(showErrorToast('Erro ao editar alocação!'));
                    return dispatch(actionFailure());
                }
            }
        }
    }
}

export function excluirAlocacao(alocacao: Alocacao, indiceAlocacao: number){
    return async (dispatch: Dispatch<any>, getState: Function) => {
            try {
                dispatch(actionReset());
                const dataAlocacao = moment(alocacao.inicio).format('YYYY-MM-DD');  //O path é a quantidade de alocações pois elas são salvas como índice de array (-1)
                const pathAlocacao = `organizacoes/${getState().organizacao.path}/salas/${getState().organizacao.idSala}/alocacoes/${dataAlocacao}/${alocacao.id}`;
                await firebase.database().ref(pathAlocacao).set({...alocacao, ativo: false});
                dispatch(showSuccessToast('Alocação desativada com sucesso!'));
                return dispatch(actionSuccess());
            }
            catch (e) {
                const ex: FirebaseError = e;
                console.log(ex);
                dispatch(showErrorToast('Erro ao desativar alocação!'));
                return dispatch(actionFailure());
            }
        }
}

export function setDate(data: any){
    return (dispatch: any) => {
        dispatch({type: SET_DATE, payload: data});
    }
}