import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Usuario from '../models/Usuario';
import moment from 'moment';
import { Avatar } from 'react-native-paper';

type Props = {
    log: any;
    usuario: Usuario;
};

const insertMiddle = (str: string, start: number, delCount: number, newSubStr: string) => {
    return str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount));
};

const DashboardItem: React.FC<Props> = props => {
    
    let texto;
    let v = '';
    let color = '#fafafa';
    switch(props.log.type){
        case 'edit':
            texto = ` alterou a alocação '${props.log.nome}', modificando`;
            switch(props.log.content){
                case 'alocacao':
                    color = '#d1e3ff';
                    if(props.log.diff) {
                        if(props.log.diff.nome) {
                            texto = `${texto}${v} seu nome para '${props.log.diff.nome}'`
                            v = ',';
                        }
                        if(props.log.diff.descricao) {
                            texto = `${texto}${v} sua descrição para '${props.log.diff.descricao}'`
                            v = ',';
                        }
                        if(props.log.diff.inicio) {
                            texto = `${texto}${v} seu horario de início para ${moment(props.log.diff.inicio).format('HH:mm')}`;
                            v = ',';
                        }
                        if(props.log.diff.inicio) {
                            texto = `${texto}${v} seu horario de fim para ${moment(props.log.diff.fim).format('HH:mm')}`;
                            v = ',';
                        }
                    }
                    if(texto.split(',').length > 2)
                        texto = insertMiddle(texto, texto.lastIndexOf(','), 2, ' e ');
                    texto = texto + '.';
            }
            break;
        case 'create':
            color = '#fffcd9';
            switch(props.log.content){
                case 'alocacao':
                    texto = ` criou uma alocação chamada '${props.log.nome}' na sala ${props.log.sala.replace(/-/g, ' ')} para o dia ${moment(props.log.inicio).format('DD/MM')}, às ${moment(props.log.inicio).format('HH:mm')}.`;
            }
            break;
        case 'delete':
            color = '#f7e4da';
            switch(props.log.content){
                case 'alocacao':
                    texto = ` cancelou a alocação '${props.log.nome}' na sala ${props.log.sala.replace(/-/g, ' ')}.`;
            }
            break;
    }


    return (
        <View style={styles.container}>
            <View style={[styles.item, {backgroundColor: color}]}>
                <Text style={styles.txtLog}>{`${props.usuario.nome}${texto}`}</Text>
                <Text style={styles.txtTime}>{`${moment(props.log.timestamp).format('HH:ss')}`}</Text>
            </View>
        </View>
    );
};

export default DashboardItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1
    },
    item: {
        flex: 1,
        borderBottomWidth: 1,
        paddingBottom: 8,
        borderColor: '#000',
    },
    txtLog: {
        fontSize: 20
    },
    txtTime: {
        fontWeight: 'bold'
    },
});
