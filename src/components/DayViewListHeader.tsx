import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
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

export function DayViewListHeader({ setData, data }) {
  const [title, setTitle] = useRecoilState(titleInputState);
  const [description, setDescription] = useRecoilState(descriptionInputState);
  const activeDate = useRecoilValue(activeDateState);
  const theme = useRecoilValue(themeState);
  const Style = StyleSheet.create({
    selectedDate: {
      fontSize: 29,
      marginLeft: 12,
      marginBottom: 30,
      color: colorScheme[theme].text,
    },
    container: {
      paddingTop: 10,
      marginLeft: 20,
      paddingLeft: 25,
      paddingBottom: 30,
      borderLeftWidth: 2,
      borderColor: colorScheme[theme].borderEvent,
    },
    icon: {
      borderRadius: 100,
      padding: 8,
      backgroundColor: colorScheme[theme].icon,
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
      const all = await getEventDataForDate(activeDate);
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
