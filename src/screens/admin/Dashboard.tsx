import React from 'react';
import { StyleSheet, View } from 'react-native';
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
            <Title style={styles.title}>Dashboard</Title>
            {logs.length && usuarios ? logs.map((log, index) => <DashboardItem log={log} usuario={usuarios[log.usuario].data} key={index}/>) : null}
        </View>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 3
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
