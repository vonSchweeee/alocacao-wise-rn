import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from '../store/types';
import { Avatar, Title, Text, IconButton, TextInput, ActivityIndicator} from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as ImageManipulator from "expo-image-manipulator";
import * as Permissions from 'expo-permissions';
import { updateProfile } from '../store/user/actions/userActions';
import { actionReset } from '../store/temp/actions/tempActions';

type Props = {
    navigation: NavigationProp<any>;
}

const ConfigPerfil: React.FC<Props> = props => {
    const usuario = useSelector((state: ReduxState) => state.user.data);
    const refBs = useRef<any>(null);
    const [image, setImage] = React.useState<{base64: string; uri: string}>();
    const [nome, setNome] = React.useState(usuario.nome);
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    const action = useSelector((state: ReduxState) => state.temp.action);

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
    
    React.useEffect(() => {
        if(action === 'success') {
            props.navigation.goBack();
            dispatch(actionReset());
        }
        if(action === 'fail') {
            setLoading(false);
            dispatch(actionReset());
        }
    }, [action]);
    const handleImagePickGallery = async () => {
        refBs.current.close();
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [1,1],
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

    const handleImagePickCamera = async () => {
        refBs.current.close();
        try {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [1,1],
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

    const handleSubmit = () => {
        setLoading(true);
        dispatch(updateProfile(nome, image?.base64));
    };

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Avatar.Image size={190} source={{uri: image?.uri || usuario.urlImagem}} style={styles.avatar}/>
                <TouchableOpacity disabled={loading} onPress={() => refBs.current.open()} activeOpacity={0.7} style={styles.touchableCamera}>
                    <Avatar.Icon size={190} icon='camera-alt' style={[styles.iconCamera, image ? {opacity: 0.4} : null]}/>
                </TouchableOpacity>
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
            </View>
            <TextInput mode='flat' autoFocus label='Nome' disabled={loading} value={nome} onChangeText={texto => setNome(texto)} style={styles.input}/>
            <View style={styles.rowContainer}>
                <IconButton icon='check' size={32} disabled={loading} style={styles.icon} onPress={handleSubmit}/>
                <IconButton icon='close' size={32} disabled={loading} style={styles.icon} onPress={() => props.navigation.goBack()}/>
            </View>
            <ActivityIndicator animating={loading} size={40}  color='#03A' />
        </View>
    );
};

export default ConfigPerfil;

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        backgroundColor: 'transparent'
    },
    wrapper: {
        position: 'relative'
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    avatar: {
        marginVertical: 8
    },
    touchableCamera: {
        position: 'absolute',
        top: 8
    },
    iconCamera: {
        opacity: 0.9,
        backgroundColor: '#0004'
    },
    nome: {
        fontSize: 30
    },
    icon: {
        backgroundColor: '#00F1'
    },
    input: {
        width: 300,
        height: 55,
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
        marginBottom: 10
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
});
