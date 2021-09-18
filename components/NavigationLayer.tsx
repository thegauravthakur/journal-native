import { TaskView } from '../views/TaskView';
import ImageGallery from '../views/ImageGallery';
import { DayView } from '../views/DayView';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Spinner from 'react-native-loading-spinner-overlay';
import { useRecoilValue } from 'recoil';
import { spinnerState } from '../recoil/atom';

export default function NavigationLayer({ navigation }) {
  const Stack = createStackNavigator();
  const spinnerValue = useRecoilValue(spinnerState);
  return (
    <>
      <Spinner
        visible={spinnerValue.visible}
        textContent={spinnerValue.textContent}
      />
      <Stack.Navigator>
        <Stack.Screen
          name={'DayView'}
          component={DayView}
          options={{
            title: 'Daily Journal',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Icon
                onPress={() => navigation.openDrawer()}
                name={'menu'}
                size={25}
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen name={'TaskView'} component={TaskView} />
        <Stack.Screen name={'ImageGallery'} component={ImageGallery} />
      </Stack.Navigator>
    </>
  );
}
