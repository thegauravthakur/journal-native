import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { DayViewEvent } from '../components/DayViewEvent';
import { DayViewListHeader } from '../components/DayViewListHeader';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { EventSchema, ImageSchema } from '../db/EventSchema';
import Realm from 'realm';
import { Calendar } from 'react-native-calendars';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeDateState } from '../recoil/atom';
import { startOfDay, endOfDay } from 'date-fns';

export function DayView() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [activeDate, setActiveDate] = useRecoilState(activeDateState);

  const realm = new Realm({
    path: 'myrealm2.realm',
    schema: [EventSchema, ImageSchema],
  });

  useEffect(() => {
    const all = realm
      .objects('Event')
      .filtered(
        'createdAt >= $0 && createdAt <= $1',
        startOfDay(activeDate),
        endOfDay(activeDate),
      )
      .sorted('createdAt', true);
    setData(all);
  }, [activeDate]);

  navigation.setOptions({
    headerRight: () => (
      <Ripple onPress={async () => {}} style={Style.ripple}>
        <Text style={Style.ripple__button}>Logout</Text>
      </Ripple>
    ),
  });
  return (
    <View style={{ flex: 1 }}>
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
            <Calendar
              onDayPress={({ timestamp }) => setActiveDate(new Date(timestamp))}
              style={{
                width: '90%',
                marginHorizontal: '5%',
                borderRadius: 10,
                marginBottom: 40,
              }}
            />
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
