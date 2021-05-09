import { TaskView } from '../views/TaskView';
import ImageGallery from '../views/ImageGallery';
import { LoginView } from '../views/LoginView';
import { DayView } from '../views/DayView';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/atom';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Text } from 'react-native';

export function NavigationLayer() {
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(true);
  const Stack = createStackNavigator();

  useEffect(() => {
    auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
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
            <Stack.Screen name={'TaskView'} component={TaskView} />
            <Stack.Screen name={'ImageGallery'} component={ImageGallery} />
          </>
        ) : (
          <Stack.Screen
            name={'LoginView'}
            options={{ title: 'Login', headerShown: false }}
            component={LoginView}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
