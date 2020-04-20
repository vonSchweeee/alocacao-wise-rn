import React from 'react'
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'

import firebase from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../store/types';
import Sala from '../../models/Sala';
import { setSalas, actionReset, actionFailure } from '../../store/temp/actions/tempActions';
import CardSala from '../../components/CardSala';
import DialogDelete from '../../components/DialogDelete';
import { createSala, editSala, deleteSala } from '../../store/organizacao/actions/organizacaoActions';
import { FAB } from 'react-native-paper';
import DialogCreateSala from '../../components/DialogCreateSala';

type dialog = 'none' | 'edit' | 'create' | 'delete' | 'info';
const initialStateSala = new Sala('', 0, false, false, false);

const Salas: React.FC = () => {

    const dispatch = useDispatch();
    const {path} = useSelector((state: ReduxState) => state.organizacao);
    const [arraySalas, setArraySalas] = React.useState<Array<Sala>>([]);
    const [dialogOpen, setDialogOpen] = React.useState<dialog>('none');
    const [sala, setSala] = React.useState<Sala>(initialStateSala);

    React.useEffect(() => {
        firebase.database().ref(`organizacoes/${path}/salas`).on('value', snapshot => { 
            const data = snapshot.val();
            if(data) {
                const keys = Object.keys(data);
                const arraySalas = keys.map(key => data[key]);
                setArraySalas(arraySalas);
                dispatch(setSalas(arraySalas));
            }
            else {
                setSalas([]);
            }
        }, (erro: any) => console.log(erro));
    }, []);

    const handleDismiss = () => {
        setDialogOpen('none');
        setTimeout(() => {
            setSala(initialStateSala);
        }, 100);
    };

    const handleSubmit = (base64image?: string) => {
        dispatch(actionReset());
        if (dialogOpen === 'create' && base64image)
            dispatch(createSala(sala, base64image));
        else if(dialogOpen === 'edit' && base64image)
            dispatch(editSala(sala, base64image)) ;
        else if(dialogOpen === 'delete')
            dispatch(deleteSala(sala)); 

        if(! base64image){
            Alert.alert('Criar sala sem imagem', 'Deseja realmente criar uma sala sem imagem?', 
            [
              {text: 'Sim', onPress: () => dispatch(createSala(sala, ''))},
              {
                text: 'Não',
                onPress: () => dispatch(actionFailure()),
                style: 'cancel',
              }
            ],
            {cancelable: false});
        }
    };


    const handleSetSala = (e: any, tipoDado: string) => {
        switch (tipoDado) {
            case 'nome':
                setSala({...sala, nome: e});
                break;
            case 'lugares':
                setSala({...sala, lugares: e});
                break;
            case 'ac':
                setSala({...sala, ac: e});
                break;
            case 'multimidia':
                setSala({...sala, multimidia: e});
                break;
            case 'sala':
                setSala(e);
                break;
        }
    };

    const handleOpenDialog = (type: 'edit' | 'delete', sala: Sala) => {
        setSala(sala);
        setDialogOpen(type);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {arraySalas.length ? arraySalas.map(sala => <CardSala key={sala.nome} sala={sala} setDialogOpen={handleOpenDialog}/>) : null}
            </ScrollView>
            <FAB icon='add' style={styles.fab} onPress={() => setDialogOpen('create')}/>
            <DialogCreateSala dialogOpen={dialogOpen} onDismiss={handleDismiss} sala={sala} handleSetSala={handleSetSala} submit={handleSubmit}/>
            <DialogDelete nome={sala.nome} dialogOpen={dialogOpen} onDismiss={handleDismiss} onConfirm={handleSubmit} subject='sala'/>
        </View>
    );
};

export default Salas;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc'
    },
    fab: {
        elevation: 5,
        position: 'absolute',
        right: 30,
        bottom: 30,
    },
});
