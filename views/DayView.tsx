import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { DayViewEvent } from '../components/DayViewEvent';
import { DayViewListHeader } from '../components/DayViewListHeader';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState } from '../recoil/atom';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';

// import { request, PERMISSIONS } from 'react-native-permissions';

export function DayView() {
  const navigation = useNavigation();
  const setUser = useSetRecoilState(userState);
  const [data, setData] = useState([
    {
      title: 'Event 1 Description',
      time: 1618136035755,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      title: 'Event 2 Description',
      time: 1618136035655,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      title: 'Event 3 Description',
      time: 1618136035625,
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis',
    },
    {
      title: 'Event 4 Description',
      time: 1618136035555,
      description:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores',
    },
    {
      title: 'Event 5 Description',
      time: 1618136035455,
      description:
        'slore aieo lcnoe wopqn mdoe hnvowl ls dfioej  cjvod oie  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis',
    },
    {
      title: 'Event 5 Description',
      time: 1618136035155,
      description:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
  ]);
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
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={Style.list}
        keyboardShouldPersistTaps={'handled'}
        ListHeaderComponent={() => (
          <DayViewListHeader data={data} setData={setData} />
        )}
        data={data}
        renderItem={({ item, index }) => (
          <DayViewEvent
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
