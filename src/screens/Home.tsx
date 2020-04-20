import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from '../store/types';
import { Button } from 'react-native-paper';
import { logout } from '../store/auth/actions/authActions';
import { NavigationProp } from '@react-navigation/native';
import Header from '../components/Header';

type Props = {
    navigation: NavigationProp<any>;
    scene: any;
    previous: any;
}

const Home: React.FC<Props> = props => {
    const usuario = useSelector((state: ReduxState) => state.user.data);
    const dispatch = useDispatch();
    if(! usuario){
        dispatch(logout());
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{ usuario ? usuario.nome && `Seja bem-vindo, ${usuario.nome}.` : null}</Text>
            <Button onPress={() => dispatch(logout())}>
                <Text>Sair</Text>
            </Button>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    text: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: 15
    }
});
