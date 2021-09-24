import { TaskView } from '../views/TaskView';
import ImageGallery from '../views/ImageGallery';
import { DayView } from '../views/DayView';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Spinner from 'react-native-loading-spinner-overlay';
import { useRecoilValue } from 'recoil';
import { spinnerState, themeState } from '../recoil/atom';
import colorScheme from '../constants/colorScheme';

type RootStackParamList = {
  DayView: undefined;
  TaskView: undefined;
  ImageGallery: undefined;
};

export default function NavigationLayer({ navigation }) {
  const Stack = createStackNavigator<RootStackParamList>();
  const spinnerValue = useRecoilValue(spinnerState);
  const theme = useRecoilValue(themeState);
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
            title: 'Indexing Life',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Icon
                onPress={() => navigation.openDrawer()}
                name={'menu'}
                color={colorScheme[theme].text}
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
