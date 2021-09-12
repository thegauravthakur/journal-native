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
import { Modal, Text } from 'react-native';
import BackupRestoreModal from './components/BackupRestoreModal';
import ModalTester from './components/BackupRestoreModal';
import { useState } from 'react';

function App() {
  const Drawer = createDrawerNavigator();
  const [isModalVisible, setModalVisible] = useState(false);

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
            options={{ headerShown: false }}
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
        label='Backup / Resotre'
        onPress={() => setModalVisible(true)}
      />
    </DrawerContentScrollView>
  );
}

export default App;
