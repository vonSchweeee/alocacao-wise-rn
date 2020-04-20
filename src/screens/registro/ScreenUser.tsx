import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { NavigationProp, useRoute } from '@react-navigation/native';

type Props = {
    navigation: NavigationProp<any>;
}

const ScreenUser: React.FC<Props> = props => {

    const route = useRoute();
    const [btnDisabled, setBtnDisabled] = React.useState(true);
    const {email, tipoOrg}: any = route.params;   
    const [nome, setNome] = React.useState('');
    const [senha, setSenha] = React.useState('');

    React.useEffect(() => {
        if(nome.length >= 3 && senha.length >= 6){
            setBtnDisabled(false);
        }
        else{
            setBtnDisabled(true);
        }
    }, [nome, senha]);

    return (
        <View style={styles.container}>
            <View style={styles.pushContainer}/>
            <Text style={styles.text}>Por fim, suas informações.</Text>
            <TextInput mode='flat' label='Nome' style={styles.textInput} placeholder='Por favor insira seu nome...'
                value={nome} onChangeText={text => setNome(text)} textContentType='emailAddress'/>
            <TextInput mode='flat' secureTextEntry={true} label='Senha' style={styles.textInput} value={senha} 
                onChangeText={text => setSenha(text)}  textContentType='password' placeholder='Minímo de 6 caracteres.'
            />
            <Button onPress={() => props.navigation.navigate('RegisterProcessScreen', {email, nome, senha, tipoOrg})} disabled={btnDisabled} 
                style={btnDisabled ? styles.buttonDisabled : styles.button} mode='contained'>Continuar
            </Button>
            <View style={[styles.pushContainer, styles.pushContainer2]}/>
        </View>
    );
};

export default ScreenUser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#22F1'
    },
    pushContainer: {
        flex: 1
    },
    pushContainer2: {
        marginBottom: 50
    },
    text: {
        fontSize: 32,
        fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'Arial',
        marginBottom: 30
    },
    textInput: {
        width: '70%',
        paddingHorizontal: 0,
        marginBottom: 25
    },
    button: {
        borderRadius: 3
    },
    buttonDisabled: {
        borderRadius: 3,
        opacity: 0.5
    }
});
