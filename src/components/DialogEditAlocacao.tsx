import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native'
import { Button, Dialog, Portal, Divider, TextInput, IconButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Alocacao from '../models/Alocacao';
import moment from 'moment';
import { TextInputMask } from 'react-native-masked-text'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { ReduxState } from '../store/types';

type dialog = 'none' | 'edit' | 'create' | 'delete' | 'info';

type Props = {
    dialogOpen: dialog;
    onDismiss: () => void;
    alocacao: Alocacao;
    handleSetAlocacao: (dado: any, tipoDado: 'nome' | 'descricao' | 'inicio' | 'fim') => void;
    submit: (type: dialog, inicioEdit?: string | Date, fimEdit?: string | Date) => void;
}

const DialogCreateAlocacao: React.FC<Props> = props => {

    const {action } = useSelector((state: ReduxState) => state.temp);
    const [btnDisabled, setBtnDisabled] = React.useState(false);
    const [txtInicio, setTxtInicio] = React.useState<string | undefined>(undefined);
    const [txtFim, setTxtFim] = React.useState<string | undefined>(undefined);
    const refInicio = React.useRef(null);
    const refFim = React.useRef(null);

    React.useEffect(() => {
        if(action === 'success') {
            props.onDismiss();
            setTxtInicio(undefined);
            setTxtFim(undefined);
            return setBtnDisabled(false);
        }
        if(action === 'fail')
            return setBtnDisabled(false);
    }, [action]);

    const submitEdit = () => {
        const data = moment(props.alocacao.inicio).format('YYYY-MM-DD')
        let inicio;
        if(txtInicio)
            inicio = moment(data + ' ' + txtInicio).format('YYYY-MM-DD HH:mm:ss');
        let fim;
        if(txtFim)
            fim = moment(data + ' ' + txtFim).format('YYYY-MM-DD HH:mm:ss');
        props.submit('edit', inicio, fim);

    }

    const handleDismiss = () => {
        setTxtInicio(undefined);
        setTxtFim(undefined);
        props.onDismiss();
    }

    return (
        <Portal>
            <Dialog visible={props.dialogOpen === 'edit'} onDismiss={! btnDisabled ? props.onDismiss : () => {}}>
                <Dialog.Title style={styles.title}>{'Editar Alocação'}</Dialog.Title>
                <Dialog.Content>
                    <TextInput mode='flat' style={styles.textInput} label='Título' 
                        onChangeText={txt => props.handleSetAlocacao(txt, 'nome')}  
                        value={props.alocacao.nome}
                    />
                    <TextInput mode='flat' style={styles.textInput} label='Descrição'
                        onChangeText={txt => props.handleSetAlocacao(txt, 'descricao')}  
                        value={props.alocacao.descricao}
                    />
                    <View style={styles.wrapper}>
                        <TextInput
                            error={txtInicio ? ! /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(txtInicio) ? true : false : false}
                            selectTextOnFocus={true}
                            value={txtInicio || txtInicio === '' ? txtInicio : moment(props.alocacao.inicio).format('HH:mm')}
                            render={props =>
                                <TextInputMask 
                                    {...props}
                                    ref={refInicio}
                                    type='custom'
                                    options={{
                                        mask: '99:99'
                                    }}
                                />
                            }
                            onChangeText={txt => setTxtInicio(txt)}
                            mode='flat' style={styles.textInput} label='Horário de Início'
                            
                        /> 
                    </View>
                    <View style={styles.wrapper}>   
                        <TextInput
                            error={txtFim ? ! /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(txtFim) ? true : false : false}
                            selectTextOnFocus={true}
                            value={txtFim || txtFim === '' ? txtFim : moment(props.alocacao.fim).format('HH:mm')}
                            render={props =>
                                <TextInputMask 
                                    {...props}
                                    ref={refFim}
                                    type='custom'
                                    options={{
                                        mask: '99:99'
                                    }}
                                />
                            }
                            onChangeText={txt => setTxtFim(txt)}
                            mode='flat' style={styles.textInput} label='Horário de Fim'
                            
                        /> 
                    </View>
                    {/* <Text>{texto}</Text> */}

                </Dialog.Content>
                <Divider style={styles.divider}/>
                <Dialog.Actions style={styles.action}>
                    <Button disabled={btnDisabled} onPress={handleDismiss}>Cancelar</Button>
                    <Button disabled={btnDisabled} onPress={submitEdit}>Confirmar</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 4
    },
    divider: {
        height: 1
    },
    action: {
        marginHorizontal: 1,
        paddingTop: 2,
        paddingBottom: 4
    },
    textInput: {
        height: 55,
        backgroundColor: 'transparent',
        paddingHorizontal: 0
    },
    wrapper: {
        position: 'relative'
    },
    inputIcon: {
        position: "absolute",
        right: 0,
        marginTop: 13
    }
})


export default DialogCreateAlocacao;