import * as React from 'react';
import { RecoilRoot } from 'recoil';
import NavigationLayer from './components/NavigationLayer';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ModalTester from './components/BackupRestoreModal';
import { useEffect, useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { checkAndRequestPermission } from './services/permissions';

function App() {
  const Drawer = createDrawerNavigator();
  const [isModalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    checkAndRequestPermission().then();
  }, []);
  return (
    <RecoilRoot>
      <ModalTester
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={'EventView'}
          defaultScreenOptions={{ headerShown: false }}
          drawerContent={props => CustomDrawerContent(props, setModalVisible)}>
          <Drawer.Screen
            options={{
              headerShown: false,
              drawerIcon: ({ color, size }) => (
                <MaterialIcon color={color} name={'home'} size={size} />
              ),
            }}
            name='Home'
            component={NavigationLayer}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

function CustomDrawerContent(props, setModalVisible) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={({ color, size }) => (
          <MaterialIcon size={size} color={color} name={'backup-restore'} />
        )}
        label='Backup | Restore'
        onPress={() => setModalVisible(true)}
      />
    </DrawerContentScrollView>
  );
}

export default App;
