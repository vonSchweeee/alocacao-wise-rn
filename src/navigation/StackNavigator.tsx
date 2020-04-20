import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Registro from '../screens/Registro';
import { useSelector } from 'react-redux';
import { ReduxState } from '../store/types';
import Loading from '../screens/Loading';
import AdminDrawerNavigator from './AdminDrawerNavigator';
import UserDrawerNavigator from './UserDrawerNavigator';
import Header from '../components/Header';
import AdmSalas from '../screens/admin/Salas';
import UserSalas from '../screens/Salas';
import Alocacoes from '../screens/Alocacoes';
import Perfil from '../screens/Perfil';
import ConfigPerfil from '../screens/ConfigPerfil';
import ScreenEmail from '../screens/registro/ScreenEmail';
import ScreenTipoOrg from '../screens/registro/ScreenTipoOrg';
import ScreenUser from '../screens/registro/ScreenUser';
import ScreenRegisterProcess from '../screens/registro/ScreenRegisterProcess';
import ScreenFiliais from '../screens/registro/ScreenFiliais';

const Stack = createStackNavigator();

export default function StackNavigator() {

  const {auth} = useSelector(
    (state: ReduxState) => state.auth
  );
  const {admin} = useSelector((state: ReduxState) => state.user);

  const {firstLogin} = useSelector((state: ReduxState) => state.preferences);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={auth === 'true' ? 'Home' : auth === 'false' ? firstLogin ? 'Welcome' : 'Login' : 'Loading'} headerMode='screen'
      screenOptions={{header: ({ scene, previous }) => (<Header scene={scene} previous={previous} />)}}>
        { auth === 'true' ? 
            admin ?
            <Stack.Screen name="Home"  component={AdminDrawerNavigator}/>
            :
            <Stack.Screen name="Home" component={UserDrawerNavigator}/>
          : auth === 'false' ?
        <>
          <Stack.Screen options={{headerShown: false}} name="Welcome" component={Welcome} />
          <Stack.Screen options={{headerShown: false}} name="Login" component={Login}/>
          <Stack.Screen options={{headerShown: false}} name="Registro" component={StackRegistro}/>
        </>
        :
        <Stack.Screen options={{headerShown: false}} name="Loading" component={Loading} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const StackAdmSalaAlocacao = () => {
  return(
    <Stack.Navigator initialRouteName={'Salas'} headerMode='none'>
          <Stack.Screen name="Salas" component={AdmSalas} />
          <Stack.Screen name="Alocações" component={Alocacoes}/>
    </Stack.Navigator>
  );
};

export const StackUserSalaAlocacao = () => {
  return(
    <Stack.Navigator initialRouteName={'Salas'} headerMode='none'>
          <Stack.Screen name="Salas" component={UserSalas} />
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

export const StackRegistro = () => {
  return (
    <Stack.Navigator initialRouteName={'ScreenEmail'} headerMode='none'>
          <Stack.Screen name="ScreenEmail" component={ScreenEmail} />
          <Stack.Screen name="TipoOrgScreen" component={ScreenTipoOrg}/>
          <Stack.Screen name="FiliaisScreen" component={ScreenFiliais}/>
          <Stack.Screen name="UserScreen" component={ScreenUser}/>
          <Stack.Screen name="RegisterProcessScreen" component={ScreenRegisterProcess}/>
    </Stack.Navigator>
  );
}