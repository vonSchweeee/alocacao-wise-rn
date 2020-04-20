import { USER_SET,  LOGOUT, USER_UPDATED } from "../types";
import Usuario from "../../../models/Usuario";
import axios from "axios";
import firebase from '../../../firebase';
import { showSuccessToast, showErrorToast } from "../../ui/actions/uiActions";
import { actionReset, actionSuccess, actionFailure } from "../../temp/actions/tempActions";

export function setUser(user: Usuario, admin?: boolean, uuid?: string){
  return {
    type: USER_SET, 
    payload: {user, admin: admin || false, uuid}
  }; 
}
  
export const removeUser = () => {
  return {type: LOGOUT};
};

export const changePropic = (base64Image?: string, save?: boolean) => {
  return async (dispatch: any, getState: Function) => {
    try {
        const res = await axios.post('https://us-central1-alocacao-wise.cloudfunctions.net/uploadImage', {image: base64Image, type: 'salas'});
        if(save) {
          const usuario = getState().user.data;
          usuario.urlImagem = res.data.imageUrl;
          await firebase.database().ref(`organizacoes/${getState().organizacao.path}/usuarios/${getState().user.uuid}/data`).set(usuario);
          dispatch({type: USER_UPDATED, payload: usuario});
          return dispatch(showSuccessToast('Foto de perfil atualizada com sucesso!', 2000));
        }
        else {
          return res.data.imageUrl;
        }
    }
    catch(ex){
        return dispatch(showSuccessToast('Falha atualizar foto de perfil.', 3500));
    }
  };
};

export const updateProfile = (nome: string, base64Image?: string) => {
  return async (dispatch: any, getState: Function) => {
    if(base64Image) {
      try {
        dispatch(actionReset());
        const res = await axios.post('https://us-central1-alocacao-wise.cloudfunctions.net/uploadImage', {image: base64Image, type: 'usuario'});
        const urlImagem = res.data.imageUrl;
        const usuario = getState().user.data;
        usuario.urlImagem = urlImagem;
        usuario.nome = nome;
        await firebase.database().ref(`organizacoes/${getState().organizacao.path}/usuarios/${getState().user.uuid}/data`).set(usuario);
        dispatch({type: USER_UPDATED, payload: usuario});
        dispatch(actionSuccess());
        return dispatch(showSuccessToast('Informações alteradas com sucesso!', 2000));
      }
      catch(ex){
          dispatch(actionFailure());
          return dispatch(showErrorToast('Falha ao alterar informações.', 3500));
      }
    }
    else {
      try {
        dispatch(actionReset());
        const usuario = getState().user.data;
        usuario.nome = nome;
        await firebase.database().ref(`organizacoes/${getState().organizacao.path}/usuarios/${getState().user.uuid}/data`).set(usuario);
        dispatch({type: USER_UPDATED, payload: usuario});
        dispatch(actionSuccess());
        return dispatch(showSuccessToast('Informações alteradas com sucesso!', 2000));
      }
      catch(ex){
          dispatch(actionFailure());
          return dispatch(showErrorToast('Falha ao alterar informações.', 3500));
      }
    }
  };
};
