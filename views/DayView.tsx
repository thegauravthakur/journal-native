import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { DayViewEvent } from '../components/DayViewEvent';
import { DayViewListHeader } from '../components/DayViewListHeader';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/atom';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import {useQuery} from 'react-query';

export function DayView() {
  const navigation = useNavigation();
  const [user, setUser] = useRecoilState(userState);
  const {data, isLoading} = useQuery('fetch-data', async () => {
    if (user) {
      const document = await firestore().collection(user.uid).doc(format(new Date(), 'dd-MM-yyyy')).get();
      const {events} =  document.data() as any;
      return events;
    }
  });
  const [events, setEvents] = useState<any>([]);
  console.log(data);
  useEffect(() => {
    setEvents(data);
  }, [data]);

  navigation.setOptions({
    headerRight: () => (
        <Ripple
            onPress={async () => {
              setTimeout(() => setUser(null), 100);
              await auth().signOut();
            }}
            style={Style.ripple}>
          <Text style={Style.ripple__button}>Logout</Text>
        </Ripple>
    ),
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        style={Style.list}
        keyboardShouldPersistTaps={'handled'}
        ListHeaderComponent={() => (
          <DayViewListHeader loading={isLoading} data={data} setData={setEvents} />
        )}
        data={events}
        renderItem={({ item, index }: { item: any; index: number }) => (
          <DayViewEvent
            key={item?.id}
            isEnd={index === events.length - 1}
            item={item}
            setData={setEvents}
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
