import ModalTester from './BackupRestoreModal';
import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationLayer from './NavigationLayer';
import InfoView from '../views/InfoView';
import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { themeState } from '../recoil/atom';
import { StatusBar, Text, View } from 'react-native';
import colorScheme from '../constants/colorScheme';
import MMKVStorage from 'react-native-mmkv-storage';
import { setRootViewBackgroundColor } from '@pnthach95/react-native-root-view-background';

const Initiator = () => {
  const Drawer = createDrawerNavigator();
  const [isModalVisible, setModalVisible] = useState(false);
  const [theme, setTheme] = useRecoilState(themeState);
  const [loading, setLoading] = useState(true);
  const MMKV = new MMKVStorage.Loader().initialize();

  useEffect(() => {
    MMKV.getStringAsync('theme')
      .then(storedTheme => {
        console.log({ storedTheme });
        if (storedTheme) {
          setTheme(storedTheme);
          setRootViewBackgroundColor(colorScheme[storedTheme].card);
        } else {
          setTheme('dark');
          setRootViewBackgroundColor(colorScheme.dark.card);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  if (loading)
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  return (
    <>
      <StatusBar
        backgroundColor={colorScheme[theme].statusBar.backgroundColor}
        barStyle={colorScheme[theme].statusBar.barStyle}
      />
      <ModalTester
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
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
          <Drawer.Screen
            options={{
              drawerIcon: ({ color, size }) => (
                <MaterialIcon
                  color={color}
                  name={'checkbox-marked-circle-outline'}
                  size={size}
                />
              ),
              title: 'Support & Info',
              headerTintColor: colorScheme[theme].text,
            }}
            name='InfoView'
            component={InfoView}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

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

export default Initiator;
