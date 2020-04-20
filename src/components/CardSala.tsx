import React from 'react';
import { Avatar, Button, Card } from 'react-native-paper';
import Sala from '../models/Sala';
import { View, StyleSheet, Text, Platform} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { setSala, setDate } from '../store/organizacao/actions/organizacaoActions';
import { useNavigation } from '@react-navigation/native';

type Props = {
  sala: Sala;
  setDialogOpen?: (type: 'edit' | 'delete', sala: Sala) => void;
  admin: boolean;
}

const CardSala: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const findAlocacoes = () => {
    const data = moment().format('YYYY-MM-DD');
    dispatch(setSala(props.sala));
    dispatch(setDate(data));
    navigation.navigate('Alocações');
  };

  return (
    <View style={styles.container} key={props.sala.nome}>
      <Card onPress={findAlocacoes} elevation={4} accessible >
        <Card.Cover source={{ uri: props.sala.urlImagem }} style={styles.image}/>
        <Card.Content style={styles.content}>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>{props.sala.nome.length >= 23 ? props.sala.nome.substring(0, 21) + '...' : props.sala.nome}</Text>
            <View style={styles.pushContainer}/>
            {props.sala.ac && <MaterialIcons name='ac-unit' size={30}/>}
            {props.sala.multimidia && <MaterialIcons name='tv' size={30}/>}
          </View>
        </Card.Content>
        <Card.Actions style={styles.actionArea}>
          {props.admin ? <> 
            <Button onPress={() => props.setDialogOpen('edit', props.sala)}>Editar</Button>
            <Text>  </Text>
            <Button onPress={() => props.setDialogOpen('delete', props.sala)}>Excluir</Button>
          </> : null}
          <View style={styles.pushContainer}/>
          <TouchableOpacity activeOpacity={0.75}>
            <MaterialIcons name='info' size={25} style={styles.infoIcon}/>
          </TouchableOpacity>
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
  rowContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  pushContainer: {
    flex: 1
  },
  content: {
    paddingLeft: 8,
    paddingTop: 2,
    paddingBottom: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    alignSelf: 'flex-start',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : 'Arial'
  },
  infoIcon: {
    color: '#00A',
    marginRight: 5
  },
  image: {
    borderTopStartRadius: 7,
    borderTopEndRadius: 7
  },
  actionArea: {
    padding: 3
  }
});


export default CardSala;