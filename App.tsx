import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import StackNavigator from './src/navigation/StackNavigator';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from './src/components/Toast';
import Main from './src/Main';

const theme: typeof DefaultTheme = {
  ...DefaultTheme,
  roundness: 7,
  colors: {
    ...DefaultTheme.colors,
    primary: '#121874',
    accent: '#A00',
    background: '#fff',
  },
};

const settings = {
  icon: (props: any) => <MaterialIcons {...props}/>
};


export default function App() {
  console.ignoredYellowBox = ['Setting a timer'];
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <PaperProvider theme={theme} settings={settings}>
          <Toast/>
          <Main/>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
