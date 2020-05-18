import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Title } from 'react-native-paper';
import firebase from '../../firebase';
import { ReduxState } from '../../store/types';
import { useSelector } from 'react-redux';
import moment from 'moment';
import DashboardItem from '../../components/DashboardItem';

const Dashboard = () => {

    const [logs, setLogs] = React.useState<Array<any>>([]);
    const {path} = useSelector((state: ReduxState) => state.organizacao);
    const [usuarios, setUsuarios] = React.useState<any>();


    React.useEffect(() => {
        firebase.database().ref(`organizacoes/${path}/log/${moment().format('YYYY-MM-DD')}`).on('value', snapshot => {
          setLogs([]);
          const data = snapshot.val();
          if(data){
              const keys = Object.keys(data);
              let logsDia = keys.sort((a, b) => {
                return new Date(b).getTime() - new Date(a).getTime();
              }).map(key => {
                data[key].timestamp = key;
                return data[key];
              });
              logsDia = logs.concat(logsDia);
              return setLogs(logsDia);
          }
        });
    
        firebase.database().ref(`organizacoes/${path}/usuarios`).on('value', snapshot => {
          const data = snapshot.val();
          if(data){
              setUsuarios(data);
          }
        });
      }, []);
    
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Title style={styles.title}>Dashboard</Title>
            </View>
            <ScrollView style={styles.scrollView}>
              {logs.length && usuarios ? logs.map((log, index) => <DashboardItem log={log} usuario={usuarios[log.usuario].data} key={index}/>) : 
              <View  style={styles.pushContainer}/>}
            </ScrollView>
        </View>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 1
    },
    pushContainer: {
      flex: 1
    },
    titleContainer: {
      backgroundColor: '#F0F0F0',
      borderBottomWidth: 2,
      borderColor: '#000'
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 35,
        paddingTop: 10
    },
    scrollView: {
      borderColor: '#000',
      borderBottomWidth: 1
    }
});
