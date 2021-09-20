import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { DayViewEvent } from '../components/DayViewEvent';
import { DayViewListHeader } from '../components/DayViewListHeader';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import { Calendar } from 'react-native-calendars';
import { useRecoilState } from 'recoil';
import { activeDateState } from '../recoil/atom';
import { IEvent } from './types/DayView.types';
import { getEventDataForDate } from '../services/transaction';
import { getEventsToMarkOnCalendar } from '../utils/Calendar';
import { PermissionModal } from '../components/PermissionModal';
import { checkIfPermissionAreGranted } from '../services/permissions';

export function DayView() {
  const navigation = useNavigation();
  const [data, setData] = useState<IEvent[]>([]);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [activeDate, setActiveDate] = useRecoilState(activeDateState);

  useEffect(() => {
    // @ts-ignore
    getEventDataForDate(activeDate).then(events => setData(events));
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
      <Ripple
        onPress={() => {
          setActiveDate(new Date());
        }}
        style={Style.ripple}>
        <Text style={Style.ripple__button}>Today</Text>
      </Ripple>
    ),
  });
  return (
    <View style={{ flex: 1 }}>
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
                  }}>
                  No events found
                </Text>
              )}
              <Calendar
                enableSwipeMonths={false}
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
  },
  ripple__button: {
    color: 'black',
  },
});
