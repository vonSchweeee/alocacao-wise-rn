import React from 'react';
import { Avatar, Button, Card, Divider } from 'react-native-paper';
import { View, StyleSheet, Text, Platform} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import Alocacao from '../models/Alocacao';
import Usuario from '../models/Usuario';

const LeftContent = (props: any) => <Avatar.Image size={props.size} source={{uri: props.source}}/>;

type Props = {
  alocacao: Alocacao;
  usuario: Usuario;
  handleSetAlocacao: (alocacao: Alocacao, tipoDado: string) => void;
  openDialog: (type: 'edit' | 'delete') => void;
  uidUsuarioAtual?: string;
}
//pega o card na documentação do paper
const CardAlocacao: React.FC<Props> = props => {
  const handleDialogOpen = (type: 'edit' | 'delete') => {
    props.handleSetAlocacao(props.alocacao,'alocacao');
    props.openDialog(type);
  };
  return (
    <View style={styles.container}>
      <Card elevation={4} accessible onPress={() => {}}>
      <Card.Title title={props.usuario.nome} subtitle={props.alocacao.createdAt ? moment(props.alocacao.createdAt).format('HH:mm') : 'Desconhecido'} 
        left={() => LeftContent({source: props.usuario.urlImagem, size: 50})} />
        <Card.Content>
          <Text style={styles.title}>{props.alocacao.nome}</Text>
          <View style={styles.contentContainer}>
            <Text style={styles.desc}>{props.alocacao.descricao}</Text>
            <View style={styles.pushContainer}/>
            <View style={styles.infoContainer}>
              <MaterialIcons name='access-time' size={35} style={styles.clockIcon} />
              <Text style={styles.textTime}>
                {`${moment(props.alocacao.inicio).format('HH:mm')} - ${moment(props.alocacao.fim).format('HH:mm')}`}
              </Text>
            </View>
          </View>
        </Card.Content>
        <Divider style={{height: 1}}/>
        <Card.Actions style={styles.actionArea}>
          {props.uidUsuarioAtual === props.alocacao.uidUsuario ? <> 
          <Button onPress={() => handleDialogOpen('edit')}>Editar</Button>
            <Text>  </Text>
          <Button onPress={() => handleDialogOpen('delete')}>Excluir</Button>
          </> : <View style={styles.emptyActions}/>}
          <View style={styles.pushContainer}/>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 9,
  },
  pushContainer: {
    flex: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    alignSelf: 'flex-start',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : 'Arial',
    marginBottom: 5
  },
  desc: {
    marginLeft: 5
  },
  infoIcon: {
    color: '#00A',
    marginRight: 5
  },
  clockIcon: {
    color: '#000'
  },
  contentContainer: {
    height: 130,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8
  },
  textTime: {
    fontSize: 18,
    marginLeft: 5
  },
  actionArea: {
    padding: 3
  },
  emptyActions: {
    height: 35
  }
});


export default CardAlocacao;