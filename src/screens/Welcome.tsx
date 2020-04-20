import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';

const Welcome = ({navigation}: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.logoText}>Seja bem-vindo.</Text>
            </View>
            <Text style={styles.sloganText}>O que deseja fazer?</Text>
            <Button mode='contained' style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.buttonText]}>Login</Text>
            </Button>
            <Button mode='outlined' style={styles.registerButton} onPress={() => navigation.navigate('Registro')}>
                <Text style={[styles.buttonText, styles.registerText]}>Registro</Text>
            </Button>
            <Button mode='outlined' style={styles.registerOrgButton} onPress={() => navigation.navigate('Registro')}>
                <Text style={[styles.registerOrgText, styles.buttonText]}>Cadastrar sua organização</Text>
            </Button>
            <View style={styles.pushContainer}/>
        </View>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f8f8'
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    pushContainer: {
        flex: 1
    },
    welcomeText: {
        fontSize: 28,
        fontFamily: 'sans-serif-light'
    },
    logoText: {

        marginBottom: 1,
        fontSize: 50,
        fontFamily: 'sans-serif-medium',
        color: '#002171',
        textAlign: 'center'
    },
    loginButton: {
        margin: 10,
        padding: 5,
        width: 330,
        height: 55,
        borderRadius: 5,
        justifyContent: 'center'
    },
    registerOrgButton: {
        margin: 10,
        padding: 5,
        width: 330,
        height: 55,
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: '#0021dd'
    },
    registerButton: {
        margin: 10,
        padding: 5,
        width: 330,
        height: 55,
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 1
    },
    registerText: {
        color: '#002171'
    },
    registerOrgText: {
        color: '#fff'
    },
    buttonText: {
        fontSize: 15
    },
    sloganText: {
        fontWeight: '100',
        marginBottom: 10,
        fontFamily: 'sans-serif-medium'
    }
});

