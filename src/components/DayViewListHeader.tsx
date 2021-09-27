import React from 'react';
import { StyleSheet, View, Text, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ripple from 'react-native-material-ripple';
import { AddTaskInput } from './AddTaskInput';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  activeDateState,
  descriptionInputState,
  themeState,
  titleInputState,
} from '../recoil/atom';
import { format } from 'date-fns';
import uuid from 'react-native-uuid';
import getRealm from '../services/realm';
import { getEventDataForDate } from '../services/transaction';
import colorScheme from '../constants/colorScheme';
import getStyle from './DayViewListHeader.styles';

export function DayViewListHeader({ setData, data }) {
  const [title, setTitle] = useRecoilState(titleInputState);
  const [description, setDescription] = useRecoilState(descriptionInputState);
  const activeDate = useRecoilValue(activeDateState);
  const theme = useRecoilValue(themeState);
  const Style = getStyle(theme);

  const onClickHandler = async () => {
    const realm = await getRealm();
    const finalTitle = title.trim();
    const finalDescription = description.trim();
    if (finalTitle.length > 0 || finalDescription.length > 0) {
      realm.write(() => {
        realm.create('Event', {
          title: finalTitle,
          description: finalDescription,
          createdAt: new Date(),
          images: [],
          _id: uuid.v4(),
        });
      });
      const all = await getEventDataForDate(activeDate);
      setData(all);
      setTitle('');
      setDescription('');
      ToastAndroid.show('Event added!', ToastAndroid.SHORT);
    } else
      ToastAndroid.show(
        'Please add a title or description',
        ToastAndroid.SHORT,
      );
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
          <Icon
            style={Style.icon}
            name='plus'
            size={20}
            color={colorScheme[theme].subText}
          />
        </Ripple>
      </View>
    </View>
  );
}
