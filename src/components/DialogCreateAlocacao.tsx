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
    submit: (type: dialog) => void;
}

const DialogCreateAlocacao: React.FC<Props> = props => {

    const [pickerOpen, setPickerOpen] = React.useState('none');
    const {action } = useSelector((state: ReduxState) => state.temp);
    const [btnDisabled, setBtnDisabled] = React.useState(false);
    const [texto, setTexto] = React.useState('hmm');

    React.useEffect(() => {
        if(action === 'success') {
            props.onDismiss();
            return setBtnDisabled(false);
        }
        if(action === 'fail')
            return setBtnDisabled(false);
    }, [action]);

    const handleTimeChange = (e: Event, date: any,horario: 'inicio' | 'fim') => {
        if(e.type === 'dismissed'){
            return setPickerOpen('none');
        }
        else if(e.type === 'set'){
            const data = moment(date).toDate();
            setPickerOpen('none');
            return props.handleSetAlocacao(data, horario);
        }
    };

    return (
        <Portal>
            <Dialog visible={props.dialogOpen === 'create'} onDismiss={! btnDisabled ? props.onDismiss : () => {}}>
                <Dialog.Title style={styles.title}>{'Realizar Alocação'}</Dialog.Title>
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
                        <TouchableOpacity onPress={() => setPickerOpen('inicio')}>
                            <TextInput value={moment(props.alocacao.inicio).format('HH:mm')} 
                                mode='flat' style={styles.textInput} 
                                editable={false}
                                label='Horário de Início' 
                            />
                        </TouchableOpacity>
                        <IconButton style={styles.inputIcon} icon='event' color='#333' size={30} 
                            onPress={() => setPickerOpen('inicio')} >
                        </IconButton>
                    </View>
                    <View style={styles.wrapper}>
                        <TouchableOpacity onPress={() => setPickerOpen('fim')}>
                            <TextInput value={moment(props.alocacao.fim).format('HH:mm')} 
                                mode='flat' style={styles.textInput} label='Horário de Fim'
                                editable={false}
                            />
                        </TouchableOpacity>
                        <IconButton style={styles.inputIcon} icon='event' color='#333' size={30} 
                            onPress={() => setPickerOpen('fim')} >
                        </IconButton>
                    </View>
                    {pickerOpen !== 'none'? pickerOpen === 'inicio' ?
                        <DateTimePicker value={new Date(props.alocacao.inicio)}
                            mode='time'
                            minimumDate={new Date()}
                            locale='pt-BR'
                            minuteInterval={10}
                            timeZoneOffsetInMinutes={-180}
                            onChange={(e, date) => handleTimeChange(e, date, 'inicio')}
                        />
                        :
                        pickerOpen === 'fim' ?
                        <DateTimePicker value={new Date(props.alocacao.fim)}
                            mode='time'
                            minimumDate={new Date()}
                            locale='pt-BR'
                            minuteInterval={10}
                            timeZoneOffsetInMinutes={-180}
                            onChange={(e, date) => handleTimeChange(e, date, 'fim')}
                        /> : null : null
                    }
                </Dialog.Content>
                <Divider style={styles.divider}/>
                <Dialog.Actions style={styles.action}>
                    <Button disabled={btnDisabled} onPress={props.onDismiss}>Cancelar</Button>
                    <Button disabled={btnDisabled} onPress={() => props.submit(props.dialogOpen)}>Confirmar</Button>
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