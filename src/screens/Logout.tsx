import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logout } from '../store/auth/actions/authActions';
import { NavigationProp } from '@react-navigation/native';

type Props = {
    navigation: NavigationProp<any>;
}

const Logout: React.FC<Props> = props => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(logout());
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Desconectando-se...</Text>
            <ActivityIndicator size={50}/>
        </View>
    );
};

export default Logout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 40,
        marginBottom: 20
    }
});
