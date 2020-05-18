import React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ReduxState } from '../store/types';

type dialog = 'none' | 'edit' | 'create' | 'delete' | 'info';

type Props = {
    dialogOpen: dialog;
    onDismiss: () => void;
    onConfirm: () => void;
    subject: 'sala' | 'alocacao';
    nome: string;
}

const DialogDelete: React.FC<Props> = props => {

    const {action} = useSelector((state: ReduxState) => state.temp);

    React.useEffect(() => {
        if(action === 'success') {
            props.onDismiss();
        }

    }, [action]);

    if(props.subject === 'alocacao')
        return (
            <View>
                <Portal>
                <Dialog
                    visible={props.dialogOpen === 'delete'}
                    onDismiss={props.onDismiss}>
                    <Dialog.Title>Desativar alocação</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{`Tem certeza que deseja desativar a alocação '${props.nome}'?`}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={props.onDismiss}>Cancelar</Button>
                        <Button onPress={props.onConfirm}>Confirmar</Button>
                    </Dialog.Actions>
                </Dialog>
                </Portal>
            </View>
        );
    else
        return (
            <View>
                <Portal>
                <Dialog
                    visible={props.dialogOpen === 'delete'}
                    onDismiss={props.onDismiss}>
                    <Dialog.Title>Excluir sala</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{`Tem certeza que deseja desativar a sala '${props.nome}' e todos os dados relacionados?`}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={props.onDismiss}>Cancelar</Button>
                        <Button onPress={props.onConfirm}>Confirmar</Button>
                    </Dialog.Actions>
                </Dialog>
                </Portal>
            </View>
        );
};

export default DialogDelete;