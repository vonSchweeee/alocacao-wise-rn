import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerContentComponentProps, DrawerContentOptions, DrawerItem } from '@react-navigation/drawer';
import Home from '../screens/Home';
import { MaterialIcons } from '@expo/vector-icons';
import { StackSalaAlocacao, StackPerfilConfig} from './StackNavigator';
import { Avatar, Title, Caption, Drawer as PaperDrawer, Divider} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from '../store/types';
import Usuario from '../models/Usuario';
import Dashboard from '../screens/admin/Dashboard';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    const usuario = useSelector((state: ReduxState) => state.user.data);
    const nomeOrg = useSelector((state: ReduxState) => state.organizacao.data.nome);
    const dispatch = useDispatch();
    const logout = () => dispatch(logout);
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => DrawerContent({...props, usuario, nomeOrg, logout})}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Salas" component={StackSalaAlocacao} />
            <Drawer.Screen name="Perfil" component={StackPerfilConfig} />
            <Drawer.Screen name="Dashboard" component={Dashboard} />
        </Drawer.Navigator>
    );
}

type ContentProps =  DrawerContentComponentProps<DrawerContentOptions> & {usuario: Usuario; nomeOrg: string; logout: () => void};

function DrawerContent(props: ContentProps) {
    

    return (
      <DrawerContentScrollView {...props} style={styles.drawer}>
        <View
          style={styles.drawerContent}
        >
          <View style={styles.userInfoSection}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Perfil')}>
            <Avatar.Image
              source={{
                uri:
                  props.usuario.urlImagem
              }}
              size={50}
              style={styles.avatar}
            />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Perfil')}>
                <Title style={styles.title}>{props.usuario.nome ? props.usuario.nome.length >= 18 ? props.usuario.nome.substring(0, 15) + '...' : props.usuario.nome : ''}</Title>
                <Caption style={styles.caption}>{props.nomeOrg}</Caption>
            </TouchableOpacity>
          </View>
          <PaperDrawer.Section style={styles.drawerSection}>
            <Divider style={styles.divider}/>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons
                  name="home"
                  color={color}
                  size={size}
                />
              )}
              label="Home"
              onPress={() => props.navigation.navigate("Home")}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons
                  name="dashboard"
                  color={color}
                  size={size}
                />
              )}
              label="Dashboard"
              onPress={() => props.navigation.navigate("Dashboard")}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons
                  name="person"
                  color={color}
                  size={size}
                />
              )}
              label="Perfil"
              onPress={() => props.navigation.navigate("Perfil")}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons name="list" color={color} size={size} />
              )}
              label="Salas"
              onPress={() => props.navigation.navigate("Salas")}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons
                  name="settings"
                  color={color}
                  size={size}
                />
              )}
              label="Configurações"
              onPress={() => {}}
            />
          </PaperDrawer.Section>
          <PaperDrawer.Section>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons
                  name="exit-to-app"
                  color={color}
                  size={size}
                />
              )}
              label="Sair"
              onPress={props.logout}
            />
          </PaperDrawer.Section>
          {/* <PaperDrawer.Section title="Preferences">
            <TouchableRipple onPress={() => {}}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={false} />
                </View>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => {}}>
              <View style={styles.preference}>
                <Text>RTL</Text>
                <View pointerEvents="none">
                  <Switch value={false} />
                </View>
              </View>
            </TouchableRipple>
          </PaperDrawer.Section> */}
        </View>
      </DrawerContentScrollView>
    );
  }

  const styles = StyleSheet.create({
    drawer: {
      backgroundColor: '#f9f9f9'
    },
    drawerContent: {
      flex: 1,
      backgroundColor: '#fff'
    },
    userInfoSection: {
      paddingLeft: 20,
      paddingTop: 8,
      flexDirection: 'row',
      alignItems: 'center'
    },
    avatar: {
        marginRight: 5
    },
    title: {
      fontSize: 24,
      marginRight: 15,
      fontWeight: 'bold',
      marginBottom: 0
    },
    caption: {
      fontSize: 13,
      lineHeight: 14,
      marginLeft: 3,
      marginTop: 0
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    divider: {
        height: 1
    },
    emptySection: {
        backgroundColor: '#FAFAFA'
    }
  });