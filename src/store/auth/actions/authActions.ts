import firebase from "../../../firebase";
import { showErrorToast, showSuccessToast } from "../../ui/actions/uiActions";
import Axios from 'axios';
import Usuario from "../../../models/Usuario";
import { authFailed } from "../../temp/actions/tempActions";
import { setUser } from "../../user/actions/userActions";
import { LOGIN_SUCCESS, AuthActionTypes, SET_AUTH, SET_NOT_AUTH } from "../types";
import { LOGOUT } from "../../user/types";
import { setOrg } from "../../organizacao/actions/organizacaoActions";
import { Dispatch } from "redux";

  export const authenticate = (email: string, senha: string) => {
    return async (dispatch: any) => {
      try{
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const resp = await firebase.auth().signInWithEmailAndPassword(email, senha);
        const token = await resp.user?.getIdTokenResult();
        const claims = token?.claims;
        const uuid = resp.user?.uid;
        if(resp.user && token && claims) {
          const userDataRaw = await firebase.database().ref(`organizacoes/${claims.dominio}/${claims.tipo}/${claims.organizacao}/usuarios/${uuid}/data`).once('value');
          const userData = await userDataRaw.val();
          if(uuid) {
            dispatch(showSuccessToast('Usuário autenticado com sucesso!', 1000))
            dispatch(setOrg(claims.dominio, claims.tipo, claims.organizacao));
            dispatch(setUser(userData, claims.admin ? claims.admin : false, uuid));
          }       
        }
        else {
          dispatch(showErrorToast('Erro desconhecido. Tente novamente em alguns minutos.', 10000));
        }
      }
      catch(ex) {
        console.log(ex);
        if(ex.code) {
          switch(ex.code){
            case 'auth/wrong-password':
              dispatch(showErrorToast('Senha incorreta.', 3500));
              return dispatch(authFailed());
            case 'auth/user-not-found':
              dispatch(showErrorToast('Usuário informado não existe. Verifique o e-mail.', 3500));
              return dispatch(authFailed());
            default: 
              dispatch(showErrorToast('Falha na autenticação! Tente autenticar-se em Login.', 3500));
              return dispatch(authFailed());
          }
        }
        dispatch(showErrorToast('Falha na autenticação! Tente autenticar-se em Login.', 3500));
        dispatch(authFailed());
      }
    }
  }

  export const loginSuccess = () => {
    return {
      type: LOGIN_SUCCESS
    }
  }

  export const register = (user: Usuario, dominio: string, nomeOrg: string, tipoOrg: string) => {
    return async (dispatch: any) => {
      try {
        nomeOrg = nomeOrg.replace(/ /g, '-');
        nomeOrg = nomeOrg.toLowerCase();
        dominio = dominio.replace(/\./g, '-');
        const resp = await firebase.auth().createUserWithEmailAndPassword(user.email, user.senha);
        const uuid = resp.user?.uid;
        await Axios.post('addUser', {user, uuid, dominio, nomeOrg, tipoOrg});
        dispatch(showSuccessToast('Usuário cadastrado com sucesso!', 1200));
        setTimeout(() => {
          dispatch(authenticate(user.email, user.senha));
        }, 400)

      }
      catch(ex){
        console.log(ex);
        if(ex) {
          if(ex.code){
            switch(ex.code){
              case 'auth/email-already-in-use':
                dispatch(showErrorToast('O e-mail informado já está sendo utilizado!'), 4500);
                break;
              default:
                dispatch(showErrorToast(ex.message), 4500);
                break;
            }
          }
          else if(ex.response){
            dispatch(showErrorToast(ex.response.data.msg), 4500);
          }
          else {
            dispatch(showErrorToast('Erro ao cadastrar a conta.'), 4500);
          }
        }
        
        else
          dispatch(showErrorToast('Erro ao cadastrar a conta.'), 4500);
        return dispatch(authFailed());
      }
    }
  }

  export const registerAdm = (user: Usuario, dominio: string, nomeOrg: string) => {
    return async (dispatch: any) => {
      try {
        const resp = await firebase.auth().createUserWithEmailAndPassword(user.email, user.senha);
        const uuid = resp.user?.uid;
        if(uuid) {
          await Axios.post('addAdminUser', {user, uuid, dominio, nomeOrg});
          dispatch(showSuccessToast('Organização e usuário cadastrados com sucesso!', 1200));
          setTimeout(() => {
            dispatch(authenticate(user.email, user.senha));
          }, 400)
        }
        else {
          throw new Error();
        }
      }
      catch(ex){
        console.log(ex);
        if(ex) {
          if(ex.code){
            switch(ex.code){
              case 'auth/email-already-in-use':
                dispatch(showErrorToast('O e-mail informado já está sendo utilizado!'), 4500);
                break;
              default:
                dispatch(showErrorToast(ex.message), 4500);
                break;
            }
          }
          else if(ex.response){
            dispatch(showErrorToast(ex.response.data.msg), 4500);
          }
          else {
            dispatch(showErrorToast('Falha ao registrar o usuário!'), 4500);
          }
        }
        
        else
          dispatch(showErrorToast('Falha ao registrar o usuário!'), 4500);
        return dispatch(authFailed());
      }
    }
  }

  export const logout = () => {
    return async (dispatch: Dispatch<AuthActionTypes>) => {
        await firebase.auth().signOut();
        return dispatch({type: LOGOUT});
    }
  }

  export const setAuth = () => {
      return {
        type: SET_AUTH
      } 
  }
  export const setNotAuth = () => {
      return {
        type: SET_NOT_AUTH
      } 
  }