import React from 'react';
import { StyleSheet, Text, View, Platform, ScrollView, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { NavigationProp, useRoute } from '@react-navigation/native';
import axios from 'axios';
import Organizacao from '../../models/Organizacao';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
    navigation: NavigationProp<any>;
}


const ScreenFiliais: React.FC<Props> = props => {

    const route = useRoute();
    const [filiaisLoading, setFiliaisLoading] = React.useState(true);
    const [arrayFiliais, setArrayFiliais] = React.useState<string[] | undefined>([]);
    const [filial, setFilial] = React.useState('');
    const {email}: any = route.params;

    React.useEffect(() => {
        findFiliais();
    }, []);

    const findFiliais = async () => {
        try {
            const res = await axios.post('https://us-central1-alocacao-wise.cloudfunctions.net/filiaisDominio', {dominio: email.split('@')[1].replace(/\./g, '-')});
            const arrayNomeFiliais = await res.data;
            setArrayFiliais(arrayNomeFiliais);
            setFiliaisLoading(false);
        }
        catch (ex) {
            console.log(ex.response.data.msg);
            setArrayFiliais(undefined);
        }
    };

    const handleFilialSelect = (filial: string) => {
        Alert.alert('Selecionar filial', `Deseja definir ${filial} como sua organização?`, 
            [
                {
                  text: 'Não',
                  onPress: () => {},
                  style: 'cancel',
                },
              {text: 'Sim', onPress: () => props.navigation.navigate('UserScreen', {email, tipoOrg: 'M', nomeOrg: filial.replace(/ /g, '-').toLowerCase()})},
            ],
            {cancelable: true});
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Escolha a sua filial.</Text>
            <ScrollView>
                {arrayFiliais?.map(filial => 
                    <TouchableOpacity style={styles.touchableFilial} onPress={() => handleFilialSelect(filial)}>
                        <Text style={styles.textFilial}>{filial}</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
            <View style={[styles.pushContainer, styles.pushContainer2]}/>
        </View>
    );
};

export default ScreenFiliais;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#22F1'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    pushContainer: {
        flex: 1
    },
    pushContainer2: {
        marginBottom: 50
    },
    text: {
        fontSize: 35,
        fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'Arial',
        marginBottom: 30,
        textAlign: 'center'
    },
    textInput: {
        width: '70%',
        paddingHorizontal: 0,
        marginBottom: 25
    },
    touchableFilial: {
        height: 40,
        width: 400,
        borderColor: '#DDD',
        borderTopWidth: 2,
        borderBottomWidth: 2
    },
    textFilial: {
        fontSize: 28,
        textAlign: 'center'
    }
});
