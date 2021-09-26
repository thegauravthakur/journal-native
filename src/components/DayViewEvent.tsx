import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ripple from 'react-native-material-ripple';
import { format, isToday } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { ImageCollage } from './ImageCollage';
import TimeAgo from 'javascript-time-ago';
import { StackNavigationProp } from '@react-navigation/stack';
import colorScheme from '../constants/colorScheme';
import { useRecoilValue } from 'recoil';
import { themeState } from '../recoil/atom';
import getTheme from './DayViewEvent.styles';

export function DayViewEvent({ item, isEnd, index, setData }) {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { title, description, createdAt, images, _id } = item;
  const theme = useRecoilValue(themeState);
  const timeAgo = new TimeAgo('en-US');
  const Style = getTheme(theme);

  return (
    <View>
      <View
        pointerEvents={'box-none'}
        style={{
          ...Style.container,
          ...(isEnd && { borderLeftWidth: 0 }),
        }}>
        {title.length > 0 && <Text style={Style.title}>{title}</Text>}
        {description.length > 0 && (
          <Text style={Style.description}>{description}</Text>
        )}
        <ImageCollage images={images} />
        <Text style={Style.date}>
          {isToday(createdAt)
            ? timeAgo.format(createdAt)
            : `${format(new Date(createdAt), 'p')}`}
        </Text>
      </View>
      <Ripple
        onPress={() =>
          navigation.navigate('TaskView', {
            title,
            description,
            _id,
            setData: setData,
            index: index,
            imagesArray: images,
          })
        }
        rippleCentered
        style={Style.ripple}>
        <Icon
          style={Style.icon}
          name='edit'
          size={20}
          color={colorScheme[theme].subText}
        />
      </Ripple>
    </View>
  );
}
