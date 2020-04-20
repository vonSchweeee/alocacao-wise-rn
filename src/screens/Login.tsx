import React from 'react';
import { View, StyleSheet, Text, Keyboard} from 'react-native';
import { TextInput, Button, Snackbar} from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { authenticate } from '../store/auth/actions/authActions';

type Props = {
    navigation: NavigationProp<any>;
}

export default function Login({navigation}: Props){
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState<string>('');
    const [senha, setSenha] = React.useState<string>('');
    const [txtErro, setTxtErro] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleLogin = () => {
        Keyboard.dismiss();
        if(email === '' && senha === '') {
            setTxtErro("Os campos não podem ser vazios.");
        }
        else if(email === '') {
            setTxtErro("E-mail não pode ser vazio.");
        }
        else if(senha === '') {
            setTxtErro("Senha não pode ser vazia.");
        }
        /* eslint-disable */
        else if(! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        /* eslint-disable */
            setTxtErro("Digite um endereço de e-mail válido.");
        }

        else {
            setLoading(true);
            dispatch(authenticate(email, senha));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Wise</Text>
            <TextInput mode='outlined' autoFocus label='E-mail' value={email} onChangeText={email => setEmail(email)} style={styles.input}/>
            <TextInput mode='outlined' secureTextEntry label='Senha' value={senha} onChangeText={senha => setSenha(senha)} style={styles.input}/>
            <Button mode="contained" style={styles.button} onPress={() => handleLogin()}> 
                <Text style={styles.buttonText}>Login</Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        backgroundColor: 'transparent'
    },
    input: {
        width: 330
    },
    button: {
        margin: 15,
        padding: 5,
        width: 330,
        borderRadius: 5
    },
    text: {
        marginBottom: 20,
        fontSize: 65,
        fontFamily: 'sans-serif-thin',
        color: '#000'
    },
    buttonText: {
        fontSize: 16
    }
});
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#E9E9E9'
//     },
//     input: {
//         width: '70%',
//         height: 42,
//         borderColor: '#303f9f',
//         borderBottomWidth: 2,
//         backgroundColor: '#D7D7D7',
//         borderRadius: 10,
//         color: '#000',
//         fontSize: 17,
//         margin: 5,
//     },
//     button: {
//         margin: 15,
//         padding: 5
//     }
// })
