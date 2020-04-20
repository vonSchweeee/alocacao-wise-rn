import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { IconButton } from 'react-native-paper';
import { NavigationProp, useRoute } from '@react-navigation/native';

type Props = {
    navigation: NavigationProp<any>;
}


const ScreenTipoOrg: React.FC<Props> = props => {

    const route = useRoute();
    const {email}: any = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Escolha a sua filial.</Text>
            <View style={styles.rowContainer}>
                <View>
                <IconButton icon='business' size={60} onPress={() => props.navigation.navigate('UserScreen', {email, tipoOrg: 'M'})}/>
                <Text>         Matriz</Text>
                </View>
                <View>
                <IconButton icon='store' size={60} onPress={() => props.navigation.navigate('FiliaisScreen', {email})}/>
                <Text>           Filial</Text>
                </View>
            </View>
            <View style={[styles.pushContainer, styles.pushContainer2]}/>
        </View>
    );
};

export default ScreenTipoOrg;

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
    }
});
