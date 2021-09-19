import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ripple from 'react-native-material-ripple';
import { AddTaskInput } from './AddTaskInput';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  activeDateState,
  descriptionInputState,
  titleInputState,
} from '../recoil/atom';
import { endOfDay, format, startOfDay } from 'date-fns';
import uuid from 'react-native-uuid';
import getRealm from '../services/realm';

export function DayViewListHeader({ setData, data }) {
  const [title, setTitle] = useRecoilState(titleInputState);
  const [description, setDescription] = useRecoilState(descriptionInputState);
  const activeDate = useRecoilValue(activeDateState);

  const onClickHandler = async () => {
    const realm = await getRealm();
    if (title || description) {
      realm.write(() => {
        realm.create('Event', {
          title,
          description,
          createdAt: new Date(),
          images: [],
          _id: uuid.v4(),
        });
      });
      const all = realm
        .objects('Event')
        .filtered(
          'createdAt >= $0 && createdAt <= $1',
          startOfDay(activeDate),
          endOfDay(activeDate),
        )
        .sorted('createdAt', true);
      setData(all);
      setTitle('');
      setDescription('');
    }
  };
  return (
    <View>
      <Text style={Style.selectedDate}>
        {format(activeDate, 'LLLL d, yyyy')}
      </Text>
      <View>
        <View
          pointerEvents={'box-none'}
          style={{
            ...Style.container,
            ...(data.length === 0 && { borderLeftWidth: 0 }),
          }}>
          <AddTaskInput setData={setData} />
        </View>
        <Ripple onPress={onClickHandler} rippleCentered style={Style.ripple}>
          <Icon style={Style.icon} name='plus' size={20} color='#8E93A2' />
        </Ripple>
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  selectedDate: {
    fontSize: 29,
    marginLeft: 12,
    marginBottom: 30,
  },
  container: {
    paddingTop: 10,
    marginLeft: 20,
    paddingLeft: 25,
    paddingBottom: 30,
    borderLeftWidth: 2,
    borderColor: '#BDBDBD',
  },
  icon: {
    borderRadius: 100,
    padding: 8,
    backgroundColor: '#F3F4F6',
  },
  ripple: {
    position: 'absolute',
    left: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    borderRadius: 100,
  },
});
