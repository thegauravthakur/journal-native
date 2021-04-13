import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DailyView } from './views/DailyView';
import { RecoilRoot } from 'recoil';
import { DayView } from './views/DayView';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TaskView } from './views/TaskView';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <RecoilRoot>
        <Stack.Navigator initialRouteName={'DayView'}>
          {/*<Stack.Screen name={'Daily View'} component={DailyView} />*/}
          <Stack.Screen name={'TaskView'} component={TaskView} />
          <Stack.Screen
            name={'DayView'}
            component={DayView}
            options={{
              title: 'Daily Journal',
              headerTitleAlign: 'center',
              headerLeft: () => (
                <Icon name={'menu'} size={30} style={{ marginLeft: 8 }} />
              ),
            }}
          />
        </Stack.Navigator>
      </RecoilRoot>
    </NavigationContainer>
  );
}

export default App;
