import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Registro from '../screens/Registro';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from '../store/types';
import Loading from '../screens/Loading';
import firebase from '../firebase';
import { setAuth, setNotAuth } from '../store/auth/actions/authActions';
import DrawerNavigator from './DrawerNavigator';
import Header from '../components/Header';
import Salas from '../screens/admin/Salas';
import Alocacoes from '../screens/Alocacoes';
import Perfil from '../screens/Perfil';
import ConfigPerfil from '../screens/ConfigPerfil';

const Stack = createStackNavigator();

export default function StackNavigator() {

  const {auth} = useSelector(
    (state: ReduxState) => state.auth
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={auth === 'true' ? 'Home' : auth === 'false' ? 'Welcome' : 'Loading'} headerMode='screen'
      screenOptions={{header: ({ scene, previous }) => (<Header scene={scene} previous={previous} />)}}>
        { auth === 'true' ? (
          <>
            <Stack.Screen name="Home"  component={DrawerNavigator}/>
          </>
        ) : auth === 'false' ?
        <>
          <Stack.Screen options={{headerShown: false}} name="Welcome" component={Welcome} />
          <Stack.Screen options={{headerShown: false}} name="Login" component={Login}/>
          <Stack.Screen options={{headerShown: false}} name="Registro" component={Registro}/>
        </>
        :
        <Stack.Screen options={{headerShown: false}} name="Loading" component={Loading} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const StackSalaAlocacao = () => {
  return(
    <Stack.Navigator initialRouteName={'Salas'} headerMode='none'>
          <Stack.Screen name="Salas" component={Salas} />
          <Stack.Screen name="Alocações" component={Alocacoes}/>
    </Stack.Navigator>
  );
};

export const StackPerfilConfig = () => {
  return(
    <Stack.Navigator initialRouteName={'Perfil'} headerMode='none'>
          <Stack.Screen name="Perfil" component={Perfil} />
          <Stack.Screen name="ConfigPerfil" component={ConfigPerfil}/>
    </Stack.Navigator>
  );
};