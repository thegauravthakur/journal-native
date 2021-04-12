import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { DayViewEvent } from '../components/DayViewEvent';
import { AddTaskInput } from '../components/AddTaskInput';
import { DayViewListHeader } from '../components/DayViewListHeader';
import Icon from 'react-native-vector-icons/Feather';

export function DayView() {
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
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={Style.list}
        keyboardShouldPersistTaps={'always'}
        ListHeaderComponent={() => (
          <DayViewListHeader data={data} setData={setData} />
        )}
        data={data}
        renderItem={({ item, index }) => (
          <DayViewEvent isEnd={index === data.length - 1} item={item} />
        )}
      />
    </View>
  );
}

const Style = StyleSheet.create({
  list: {
    marginTop: 12,
  },
});
