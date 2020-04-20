import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';

import firebase from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../store/types';
import Sala from '../models/Sala';
import { setSalas } from '../store/temp/actions/tempActions';
import CardSala from '../components/CardSala';
import { Instagram } from 'react-content-loader/native';


const Salas: React.FC = () => {

    const dispatch = useDispatch();
    const {path} = useSelector((state: ReduxState) => state.organizacao);
    const [arraySalas, setArraySalas] = React.useState<Array<Sala> | undefined>(undefined);

    React.useEffect(() => {
        firebase.database().ref(`organizacoes/${path}/salas`).on('value', snapshot => { 
            const data = snapshot.val();
            if(data) {
                const keys = Object.keys(data);
                const arraySalas = keys.map(key => data[key]);
                setArraySalas(arraySalas);
                dispatch(setSalas(arraySalas));
            }
            else {
                setArraySalas([]);
            }
        }, (erro: any) => setSalas(undefined));
    }, []);


    const renderSalas = () => {
        if(arraySalas && arraySalas.length){
            return arraySalas.map(sala => <CardSala key={sala.nome} sala={sala} admin={false}/>);
        }
        else if(! arraySalas?.length) {
            return (
                <View>
                    <Text style={styles.noText}>Nenhuma sala encontrada!</Text>
                    <Text style={styles.noText}>Seja o primeiro a criar uma.</Text>
                </View>
            );
        }
        else if(! arraySalas) {
            return (
                <View>
                    <Text style={styles.noText}>Erro ao conectar-se ao servidor.</Text>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                { arraySalas ?
                    renderSalas()
                    :
                    <>
                        <Instagram/>
                        <Instagram/>
                    </>
                }
            </ScrollView>
        </View>
    );
};

export default Salas;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc'
    },
    fab: {
        elevation: 5,
        position: 'absolute',
        right: 30,
        bottom: 30,
    },
    noText: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 20
    }
});
