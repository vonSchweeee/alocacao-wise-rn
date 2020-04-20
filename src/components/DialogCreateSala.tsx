import React from 'react';
import { StyleSheet, View, CheckBox, Text, TouchableOpacity} from 'react-native';
import { Button, Dialog, Portal, Divider, TextInput, ActivityIndicator,  } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ReduxState } from '../store/types';
import Sala from '../models/Sala';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as ImageManipulator from "expo-image-manipulator";
import * as Permissions from 'expo-permissions';
import RBSheet from 'react-native-raw-bottom-sheet';

type dialog = 'none' | 'edit' | 'create' | 'delete' | 'info';

type Props = {
    dialogOpen: dialog;
    onDismiss: () => void;
    sala: Sala;
    handleSetSala: (dado: any, tipoDado: 'nome' | 'lugares' | 'ac' | 'multimidia') => void;
    submit: (base64: string) => void;
}

const DialogCreateSala: React.FC<Props> = props => {

    const {action } = useSelector((state: ReduxState) => state.temp);
    const [image, setImage] = React.useState<{base64: string; uri: string}>({base64: '', uri: ''});
    const refBs = React.useRef<any>(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if(action === 'success') {
            props.onDismiss();
            return setLoading(false);
        }
        if(action === 'fail')
            return setLoading(false);
    }, [action]);

    React.useEffect(() => {
        getPermissionAsync();
    }, []);

    
    const getPermissionAsync = async () => {
        if (Constants.platform && Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Desculpe, essa permissão é necessária para escolher a foto!');
            }
        }
    };

    const handleImagePickGallery = async () => {
        refBs.current.close();
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [16,9],
              quality: 1,
              base64: true
            });
            if (!result.cancelled && result.base64) {
                if(result.width > 800) {
                    const manipulatedResult = await ImageManipulator.manipulateAsync(result.uri, [{
                        resize: { width: 800}
                    }], {base64: true});
                    if(manipulatedResult.base64)
                        setImage({uri: manipulatedResult.uri, base64: manipulatedResult.base64});
                }
                else {
                    console.log(result);
                    setImage({uri: result.uri, base64: result.base64});
                }
            }
      
          } catch (E) {
            console.log(E);
          }
    };

    const handleImagePickCamera = async () => {
        refBs.current.close();
        try {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [16,9],
              quality: 1,
              base64: true
            });
            if (!result.cancelled && result.base64) {
                if(result.width > 800) {
                    const manipulatedResult = await ImageManipulator.manipulateAsync(result.uri, [{
                        resize: { width: 800}
                    }], {base64: true});
                    if(manipulatedResult.base64)
                        setImage({uri: manipulatedResult.uri, base64: manipulatedResult.base64});
                }
                else {
                    setImage({uri: result.uri, base64: result.base64});
                }
            }
      
          } catch (E) {
            console.log(E);
          }
    };


    return (
        <Portal>
            <Dialog visible={props.dialogOpen === 'create' || props.dialogOpen === 'edit'} dismissable={! loading} onDismiss={! loading ? () => {
                setImage({base64: '', uri: ''});
                props.onDismiss();
                }
                 : () => {}}>
                <Dialog.Title style={styles.title}>{props.dialogOpen === 'create' ? 'Adicionar Sala' : 'Editar Sala'}</Dialog.Title>
                <Dialog.Content>
                    <TextInput mode='flat' style={styles.textInput} label='Título' 
                        onChangeText={txt => props.handleSetSala(txt, 'nome')}  
                        value={props.sala.nome}
                    />
                    <View style={styles.rowContainer}>
                        <TextInput mode='flat' style={styles.textInputRow} label='Lugares'
                            onChangeText={txt => props.handleSetSala(txt, 'lugares')}  
                            keyboardType='number-pad'
                            value={props.sala.lugares.toString()}
                        />
                        <View style={styles.checkContainer}>
                            <Text>A/C</Text><CheckBox style={styles.checkAc} value={props.sala.ac} onValueChange={ac => props.handleSetSala(ac, 'ac')}/>
                            <Text>Multimídia</Text><CheckBox value={props.sala.multimidia} onValueChange={multimidia => props.handleSetSala(multimidia, 'multimidia')}/>
                        </View>
                    </View>
                </Dialog.Content>
                <Button mode='contained' onPress={() => refBs.current.open()} style={image.base64 ? styles.buttonConfirm : styles.button}>
                    <Text>Escolher Imagem</Text>
                    {image.base64 ? <MaterialIcons size={15} name='check'/> : null}
                </Button>
                <Divider style={styles.divider}/>
                <Dialog.Actions style={styles.action}>
                    { ! loading ? <>
                        <Button disabled={loading} onPress={props.onDismiss}>Cancelar</Button>
                        <Button disabled={loading} onPress={() => { 
                            setLoading(true);
                            props.submit(image.base64);
                            }}>Confirmar</Button>
                        </> :
                        <ActivityIndicator style={styles.ai}/>
                    }
                </Dialog.Actions>
            </Dialog>
            <RBSheet ref={refBs} closeOnDragDown={true} animationType='slide'
                closeOnPressMask={true} customStyles={{container: styles.bsContainer, wrapper: styles.bsWrapper, draggableIcon: {display: 'none'}}}
            >
                <TouchableOpacity style={styles.btnBs} disabled={loading} onPress={() => handleImagePickCamera()}>
                    <View style={[styles.rowContainer, {alignItems: 'center'}]}>
                        <MaterialIcons size={30} name='camera-alt' style={styles.iconBs}/>
                        <Text style={styles.txtBs}>Tirar Foto</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnBs} disabled={loading} onPress={() => handleImagePickGallery()}>
                    <View style={[styles.rowContainer, {alignItems: 'center'}]}>
                        <MaterialIcons size={30} name='image' style={[styles.iconBs, {marginLeft: 2}]}/>
                        <Text style={styles.txtBs}>Escolher Imagem da Galeria</Text>
                    </View>
                </TouchableOpacity>
            </RBSheet>
        </Portal>
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 60,
        marginTop: 36
    },
    checkAc: {
        marginRight: 20
    },
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
    textInputRow: {
        height: 55,
        width: '22%',
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
    },
    button: {
        width: '59%',
        alignSelf: 'center',
        marginBottom: 10
    },
    buttonConfirm: {
        width: '59%',
        alignSelf: 'center',
        marginBottom: 10,
        backgroundColor: '#2A2'
    },
    bsContainer: {
        height: 118,
    },
    bsWrapper: {
        backgroundColor: '#0001'
    },
    btnBs: {
        justifyContent: 'center',
        height: 58,
        backgroundColor: '#fafafa',
        borderColor: '#ddd',
        borderTopWidth: 3
    },
    txtBs: {
        fontSize: 18,
        padding: 5,
        marginLeft: 3
    },
    iconBs: {
        marginTop: 2
    },
    ai: {
        marginHorizontal: 41,
        marginVertical: 6
    }
});


export default DialogCreateSala;