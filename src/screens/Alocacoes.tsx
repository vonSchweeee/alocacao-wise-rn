import React from 'react'
import { StyleSheet, Text, View, ScrollView, Keyboard } from 'react-native'

import firebase from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../store/types';
import { setSalas, actionReset } from '../store/temp/actions/tempActions';
import CardAlocacao from '../components/CardAlocacao';
import Alocacao from '../models/Alocacao';
import Usuario from '../models/Usuario';
import { FAB, Card } from 'react-native-paper';
import DialogCreateAlocacao from '../components/DialogCreateAlocacao';
import moment from 'moment';
import { showErrorToast } from '../store/ui/actions/uiActions';
import { criarAlocacao, editarAlocacao, excluirAlocacao } from '../store/organizacao/actions/organizacaoActions';
import DialogDelete from '../components/DialogDelete';
import {Facebook, Instagram} from 'react-content-loader/native';
import DialogEditAlocacao from '../components/DialogEditAlocacao';

type dialog = 'none' | 'edit' | 'create' | 'delete' | 'info';

const Alocacoes: React.FC = () => {
    
    const dispatch = useDispatch();
    const {path, date, idSala} = useSelector((state: ReduxState) => state.organizacao);
    const {admin} = useSelector((state: ReduxState) => state.user);
    const [alocacaoAtiva, setAlocacaoAtiva] = React.useState(false);
    const initialStateAlocacao = new Alocacao('', '', '',   moment(date + ' 00:00:00').toDate(),  moment(date + ' 00:00:00').toDate());
    const [dialogOpen, setDialogOpen] = React.useState<dialog>('none');
    const [alocacoes, setAlocacoes] = React.useState<Array<Alocacao> | undefined>([]);
    const [usuarios, setUsuarios] = React.useState<any>(undefined);
    const [quantidadeAlocacoes, setQuantidadeAlocacoes] = React.useState<number>(0);
    const [alocacao, setAlocacao] = React.useState(initialStateAlocacao);
    const [nomeSala, setNomeSala] = React.useState();

    React.useEffect(() => {

        firebase.database().ref(`organizacoes/${path}/usuarios`).on('value', snapshot => {
            const data = snapshot.val();
            setUsuarios(data);
        });

        firebase.database().ref(`organizacoes/${path}/salas/${idSala}/alocacoes/${date}`).on('value', snapshot => { 
            const data = snapshot.val();
            if(data) {
                const keys = Object.keys(data);
                let arrayAlocacoes = keys.map(key => data[key]);
                arrayAlocacoes = arrayAlocacoes.sort(compare);
                
                setAlocacoes(arrayAlocacoes);
                setQuantidadeAlocacoes(arrayAlocacoes.length);
            }
            else {
                setAlocacoes(undefined);
            }
        }, (erro: any) => setAlocacoes(undefined));
        
        firebase.database().ref(`organizacoes/${path}/salas/${idSala}`).once('value', snapshot => { 
            const data = snapshot.val();
            const nomeSalaVal = data.nome;
            setNomeSala(nomeSalaVal);
        });

    }, [date, idSala]);

    //Função usada para fazer sort em alocações.
    const compare = (a: Alocacao, b: Alocacao ) => {
        if ( a.inicio < b.fim ){
          return -1;
        }
        if ( a.fim > b.inicio ){
          return 1;
        }
        return 0;
    };

    const handleSetAlocacao = (e: any, tipoDado: string) => {
        switch (tipoDado) {
            case 'nome':
                setAlocacao({...alocacao, nome: e});
                break;
            case 'descricao':
                setAlocacao({...alocacao, descricao: e});
                break;
            case 'inicio':
                setAlocacao({...alocacao, inicio: e});
                break;
            case 'fim':
                setAlocacao({...alocacao, fim: e});
                break;
            case 'alocacao':
                setAlocacao(e);
                break;
        }
    };

    const submit = (type: dialog, inicioEdit?: string | Date, fimEdit?: string | Date) => {
        const alocacaoEdit = {...alocacao};
        if(! alocacao.nome|| ! alocacao.descricao || alocacao.inicio === initialStateAlocacao.inicio|| alocacao.fim === initialStateAlocacao.fim){
            return dispatch(showErrorToast('Preencha todos os campos.', 3000));
        }
        if(alocacao.inicio > alocacao.fim){
            return dispatch(showErrorToast('O horário de início deve ser antes do fim.', 2000));
        }
        if(inicioEdit)
            alocacaoEdit.inicio = inicioEdit;
        if(fimEdit)
            alocacaoEdit.fim = fimEdit;

        Keyboard.dismiss();
        dispatch(actionReset());

        if (type === 'create')
            dispatch(criarAlocacao(alocacao, quantidadeAlocacoes, alocacoes));
        else if(type === 'edit')
            dispatch(editarAlocacao(alocacaoEdit, quantidadeAlocacoes -1, alocacoes, true));
        else if(type === 'delete')
            dispatch(excluirAlocacao(alocacao, quantidadeAlocacoes - 1));
    };

    const handleDismiss = () => {
        setDialogOpen('none');
        setTimeout(() => {
            setAlocacao(initialStateAlocacao);
        }, 100);
    };

    const openDialog = (type: 'delete' | 'edit') => {
        setDialogOpen(type);
    };

    const renderAlocacoes = () => {
        if(alocacoes && alocacoes.length && usuarios){
            // eslint-disable-next-line array-callback-return
            let items = alocacoes.map((alocacao, index) => {
                if(alocacao.ativo) {
                    if(! alocacaoAtiva) {
                        setAlocacaoAtiva(true);
                    }
                    let usuario: Usuario;
                    if(usuarios[alocacao.uidUsuario])
                        usuario = usuarios[alocacao.uidUsuario].data;
                    else
                        usuario = new Usuario('anonimo', 'unknown', 'unknown');
                    return(
                        <CardAlocacao 
                            handleSetAlocacao={handleSetAlocacao} openDialog={openDialog} 
                            alocacao={alocacao} usuario={usuario} uidUsuarioAtual={firebase.auth().currentUser?.uid} key={index} admin={admin} />
                    );
                }
            });
            if(alocacaoAtiva)
                return items;
            else {
                return (
                    <View>
                        <Text style={styles.noText}>Nenhuma alocação encontrada!</Text>
                        <Text style={styles.noText}>Seja o primeiro a criar uma.</Text>
                    </View>
                );
            }
        }
        else if(! alocacoes?.length && ! alocacaoAtiva) {
            return (
                <View>
                    <Text style={styles.noText}>Nenhuma alocação encontrada!</Text>
                    <Text style={styles.noText}>Seja o primeiro a criar uma.</Text>
                </View>
            );
        }
        else if(! alocacoes) {
            return (
                <View>
                    <Text style={styles.noText}>Erro ao conectar-se ao servidor.</Text>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            {alocacoes ? alocacoes?.length ?
            <ScrollView>
                {renderAlocacoes()}
            </ScrollView>
            : 
                <>
                    <Instagram/>
                    <Instagram/>
                </>
            : renderAlocacoes()
            }
            <FAB icon='add' style={styles.fab} onPress={() => setDialogOpen('create')}/>
            <DialogCreateAlocacao 
                dialogOpen={dialogOpen} onDismiss={handleDismiss} alocacao={alocacao}
                handleSetAlocacao={handleSetAlocacao} submit={submit}
            />
            <DialogEditAlocacao 
                dialogOpen={dialogOpen} onDismiss={handleDismiss} alocacao={alocacao}
                handleSetAlocacao={handleSetAlocacao} submit={submit}
            />
            <DialogDelete nome={alocacao.nome} subject='alocacao' onConfirm={() => dispatch(excluirAlocacao(alocacao, quantidadeAlocacoes -1))} 
            onDismiss={handleDismiss} dialogOpen={dialogOpen}/>
        </View>
    );
};

export default Alocacoes;

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
    noText: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 20
    }
});
