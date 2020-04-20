import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const ScreenRegisterProcess = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Iniciando...</Text>
            <ActivityIndicator size={50}/>
        </View>
    );
};

export default ScreenRegisterProcess;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 15
    }
});
