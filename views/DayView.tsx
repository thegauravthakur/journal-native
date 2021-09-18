import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { DayViewEvent } from '../components/DayViewEvent';
import { DayViewListHeader } from '../components/DayViewListHeader';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import { EventSchema, ImageSchema } from '../db/EventSchema';
import Realm from 'realm';
import { Calendar } from 'react-native-calendars';
import { useRecoilState } from 'recoil';
import { activeDateState } from '../recoil/atom';
import { startOfDay, endOfDay, format } from 'date-fns';
import { GIPHY_KEY } from 'react-native-dotenv';

export function DayView() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [activeDate, setActiveDate] = useRecoilState(activeDateState);

  const realm = new Realm({
    path: 'myrealm2.realm',
    schema: [EventSchema, ImageSchema],
  });

  useEffect(() => {
    console.log(GIPHY_KEY);
    const all = realm
      .objects('Event')
      .filtered(
        'createdAt >= $0 && createdAt <= $1',
        startOfDay(activeDate),
        endOfDay(activeDate),
      )
      .sorted('createdAt', true);
    setData(all);
    console.log('test');
  }, [activeDate]);

  useEffect(() => {
    const Events = realm.objects('Event');
    const set = new Set();
    Events.forEach(event => {
      set.add(format(event.createdAt, 'yyyy-LL-dd'));
    });
    const result = {};
    set.forEach(value => {
      result[value] = { marked: true };
    });
    const rest = result[format(activeDate, 'yyyy-LL-dd')];
    result[format(activeDate, 'yyyy-LL-dd')] = { selected: true, ...rest };
    setMarkedDates(result);
    console.log('test');
  }, [data]);

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
                enableSwipeMonths={true}
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
