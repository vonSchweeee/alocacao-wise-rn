import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';

type Props = {
    navigation: NavigationProp<any>;
}

const ScreenEmail: React.FC<Props> = props => {

    const [btnDisabled, setBtnDisabled] = React.useState(true);
    const [email, setEmail] = React.useState('');
    
    React.useEffect(() => {
        // eslint-disable-next-line no-useless-escape
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setBtnDisabled(false);
        }
        else {
            setBtnDisabled(true);
        }
    }, [email]);
       

    return (
        <View style={styles.container}>
            <View style={styles.pushContainer}/>
            <Text style={styles.text}>Primeiro, insira seu e-mail.</Text>
            <TextInput mode='flat' label='E-mail' style={styles.textInput} value={email} onChangeText={text => setEmail(text)} textContentType='emailAddress'/>
            <Button onPress={() => props.navigation.navigate('TipoOrgScreen', {email})} disabled={btnDisabled} style={btnDisabled ? styles.buttonDisabled : styles.button} 
                mode='contained'>Continuar
            </Button>
            <View style={[styles.pushContainer, styles.pushContainer2]}/>
        </View>
    );
};

export default ScreenEmail;

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
        marginBottom: 30,
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
