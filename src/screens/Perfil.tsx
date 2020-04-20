import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { ReduxState } from '../store/types';
import { Avatar, Title, Text, IconButton} from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

type Props = {
    navigation: NavigationProp<any>;
}

const Perfil: React.FC<Props> = props => {
    const usuario = useSelector((state: ReduxState) => state.user.data);
    const refBs = useRef<any>(null);
    const useForceUpdate = () => React.useState<any>()[1];
    const forceUpdate = useForceUpdate();

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener(
            'focus',
            () => {
              forceUpdate(Math.random());
            }
          );
        return unsubscribe;
    }, [props.navigation]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => refBs.current.open()}>
                <Avatar.Image size={190} source={{uri: usuario.urlImagem}} style={styles.avatar}/>
            </TouchableOpacity>
            <Title style={styles.nome}>{usuario.nome}</Title>
            <Text>{usuario.email}</Text>
            <IconButton icon='edit' size={32} style={styles.icon} onPress={() => props.navigation.navigate('ConfigPerfil')}/>
            <RBSheet ref={refBs} closeOnDragDown={true} animationType='slide'
                closeOnPressMask={true} customStyles={{container: styles.bsContainer, wrapper: styles.bsWrapper, draggableIcon: {display: 'none'}}}
            >
                <TouchableOpacity style={styles.btnBs} onPress={() => {
                    props.navigation.navigate('ConfigPerfil');
                    refBs.current.close();
                }}>
                    <View style={styles.rowContainer}>
                        <MaterialIcons size={30} name='edit' style={styles.iconBs}/>
                        <Text style={styles.txtBs}>Editar Foto de Perfil</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnBs} onPress={() => {
                    refBs.current.close();
                }}>
                    <View style={styles.rowContainer}>
                        <MaterialIcons size={30} name='remove-red-eye' style={styles.iconBs}/>
                        <Text style={styles.txtBs}>Visualizar Imagem</Text>
                    </View>
                </TouchableOpacity>
            </RBSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row'
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
    avatar: {
        marginVertical: 8
    },
    nome: {
        fontSize: 30
    },
    iconBs: {
        marginTop: 2
    },
    icon: {
        backgroundColor: '#00F1'
    }
});

export default Perfil;