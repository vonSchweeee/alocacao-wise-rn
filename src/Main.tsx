import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import StackNavigator from './navigation/StackNavigator';
import firebase from './firebase';
import { useDispatch } from 'react-redux';
import { setAuth, setNotAuth } from './store/auth/actions/authActions';


export default function Main() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if(user) {
        dispatch(setAuth());
        return unsubscribe();
      }
      else if(! user) {
        dispatch(setNotAuth());
        return unsubscribe();
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar/>
      <StackNavigator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
