import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { DayViewEvent } from '../components/DayViewEvent';
import { DayViewListHeader } from '../components/DayViewListHeader';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import { Calendar } from 'react-native-calendars';
import { useRecoilState } from 'recoil';
import { activeDateState, markedDateState, themeState } from '../recoil/atom';
import { IEvent } from './types/DayView.types';
import { getEventDataForDate } from '../services/transaction';
import { getEventsToMarkOnCalendar } from '../utils/Calendar';
import { PermissionModal } from '../components/PermissionModal';
import { checkIfPermissionAreGranted } from '../services/permissions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colorScheme from '../constants/colorScheme';
import SplashScreen from 'react-native-splash-screen';
import MMKVStorage from 'react-native-mmkv-storage';
import { setRootViewBackgroundColor } from '@pnthach95/react-native-root-view-background';

export function DayView() {
  const navigation = useNavigation();
  const [data, setData] = useState<IEvent[]>([]);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [markedDates, setMarkedDates] = useRecoilState(markedDateState);
  const [activeDate, setActiveDate] = useRecoilState(activeDateState);
  const [theme, setTheme] = useRecoilState(themeState);
  const MMKV = new MMKVStorage.Loader().initialize();

  useEffect(() => {
    getEventDataForDate(activeDate)
      .then(events => {
        // @ts-ignore
        setData(events);
      })
      .finally(() => {
        SplashScreen.hide();
      });
  }, [activeDate]);

  useEffect(() => {
    checkIfPermissionAreGranted(false).then(result => {
      if (!result) setShowPermissionModal(true);
    });
  }, []);

  useEffect(() => {
    getEventsToMarkOnCalendar(activeDate).then(markedEvents =>
      setMarkedDates(markedEvents),
    );
  }, [activeDate, data]);

  navigation.setOptions({
    headerRight: () => (
      <Icon
        size={25}
        color={colorScheme[theme].text}
        name={'white-balance-sunny'}
        style={[{ marginRight: 10 }]}
        onPress={async () => {
          const updatedTheme = theme === 'dark' ? 'light' : 'dark';
          setTheme(updatedTheme);
          await MMKV.setStringAsync('theme', updatedTheme);
          setRootViewBackgroundColor(colorScheme[updatedTheme].card);
          ToastAndroid.show(
            `Switched to ${updatedTheme} theme!`,
            ToastAndroid.SHORT,
          );
        }}
      />
    ),
  });
  return (
    <View style={{ flex: 1, backgroundColor: colorScheme[theme].background }}>
      <PermissionModal
        showPermissionModal={showPermissionModal}
        setShowPermissionModal={setShowPermissionModal}
      />
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        style={Style.list}
        keyboardShouldPersistTaps={'handled'}
        ListHeaderComponent={() => (
          <DayViewListHeader data={data} setData={setData} />
        )}
        data={data}
        ListFooterComponent={() => {
          return (
            <>
              {data.length === 0 && (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 17,
                    marginBottom: 20,
                    marginTop: -20,
                    color: colorScheme[theme].text,
                  }}>
                  No events found
                </Text>
              )}
              <Calendar
                theme={colorScheme[theme].calendarTheme}
                markedDates={markedDates}
                current={activeDate}
                onDayPress={({ timestamp }) =>
                  setActiveDate(new Date(timestamp))
                }
                style={{
                  width: '90%',
                  marginHorizontal: '5%',
                  borderRadius: 10,
                  marginBottom: 40,
                }}
              />
            </>
          );
        }}
        renderItem={({ item, index }: { item: any; index: number }) => (
          <DayViewEvent
            key={item?.id}
            isEnd={index === data.length - 1}
            item={item}
            setData={setData}
            index={index}
          />
        )}
      />
    </View>
  );
}

const Style = StyleSheet.create({
  list: {
    paddingTop: 12,
  },
  ripple: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
  },
  ripple__button: {
    color: 'white',
  },
});
