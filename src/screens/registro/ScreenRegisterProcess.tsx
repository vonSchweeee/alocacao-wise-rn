import React from 'react';
import { StyleSheet, Text, View, BackHandler } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorToast } from '../../store/ui/actions/uiActions';
import { register } from '../../store/auth/actions/authActions';
import { useRoute } from '@react-navigation/native';
import Usuario from '../../models/Usuario';
import { ReduxState } from '../../store/types';
import { actionReset } from '../../store/temp/actions/tempActions';

const ScreenRegisterProcess = (props: any) => {
    const dispatch = useDispatch();
    const route = useRoute();
    const {email, nome, senha, nomeOrg, tipoOrg}: any = route.params;
    const usuario = new Usuario(nome, email, senha);
    const action = useSelector((state: ReduxState) => state.temp.action);


    React.useEffect(() => {
        if(action === 'fail')
            props.navigation.goBack();
    }, [action])

    React.useEffect(() => {
        const unsubscribe: any = BackHandler.addEventListener('hardwareBackPress', () => {
            dispatch(showErrorToast('Aguarde a solicitação ser completada.'));
            return true;
        });

        return () => unsubscribe;
    }, []);

    React.useEffect(() => {
        dispatch(actionReset());
        dispatch(register(usuario, usuario.email.split('@')[1], nomeOrg || '', tipoOrg));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Realizando a solicitação...</Text>
            <ActivityIndicator size={50}/>
        </View>
    );
};

export default ScreenRegisterProcess;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 15
    }
});
