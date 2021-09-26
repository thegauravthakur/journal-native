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

export function DayViewEvent({ item, isEnd, index, setData }) {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { title, description, createdAt, images, _id } = item;
  const theme = useRecoilValue(themeState);
  const timeAgo = new TimeAgo('en-US');
  const Style = StyleSheet.create({
    title: {
      fontWeight: 'bold',
      fontSize: 18,
      color: colorScheme[theme].primary,
    },
    description: {
      marginTop: 5,
      fontSize: 16,
      lineHeight: 25,
      fontFamily: 'segoeui',
      color: colorScheme[theme].text,
    },
    date: {
      marginTop: 10,
      color: colorScheme[theme].subText,
    },
    container: {
      marginLeft: 20,
      marginRight: 5,
      paddingLeft: 30,
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
