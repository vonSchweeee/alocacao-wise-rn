import React from 'react';
import { TouchableOpacity} from 'react-native';
import { Appbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, DrawerActions} from '@react-navigation/native';

type Props = {
  scene: any;
  previous: any;
}

const Header: React.FC<Props> = ({ scene, previous}) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header statusBarHeight={0}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        >
          <MaterialIcons name='list' size={30} color='#FFF'/>
        </TouchableOpacity>
      <Appbar.Content
        title=''
      />
    </Appbar.Header>
  );
};


export default Header;