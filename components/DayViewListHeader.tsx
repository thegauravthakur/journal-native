import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ripple from 'react-native-material-ripple';
import { AddTaskInput } from './AddTaskInput';
import { useRecoilState } from 'recoil';
import { descriptionInputState, titleInputState } from '../recoil/atom';
import { format } from 'date-fns';

export function DayViewListHeader({ setData, data }) {
  const [title, setTitle] = useRecoilState(titleInputState);
  const [description, setDescription] = useRecoilState(descriptionInputState);

  const onClickHandler = () => {
    if (title || description) {
      const temp = [...data];
      temp.unshift({ title, description, time: Date.now() });
      setData(temp);
      setTitle('');
      setDescription('');
    }
  };
  return (
    <View>
      <Text style={Style.selectedDate}>
        {format(new Date(), 'LLLL d, yyyy')}
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
    fontSize: 32,
    fontWeight: 'bold',
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
