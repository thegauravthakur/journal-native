import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ripple from 'react-native-material-ripple';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { ImageCollage } from './ImageCollage';

export function DayViewEvent({ item, isEnd, index, setData }) {
  const navigation = useNavigation();
  const { title, description, time, images } = item;
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
        {/*<ImageCollage images={images} />*/}
        <Text style={Style.date}>{format(new Date(time), 'do LLL, yyyy')}</Text>
      </View>
      <Ripple
        onPress={() =>
          navigation.navigate('TaskView', {
            title,
            description,
            setData: setData,
            index: index,
            imagesArray: images,
          })
        }
        rippleCentered
        style={Style.ripple}>
        <Icon style={Style.icon} name='edit' size={20} color='#8E93A2' />
      </Ripple>
    </View>
  );
}

const Style = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 19,
  },
  description: {
    marginTop: 5,
    fontSize: 16,
    lineHeight: 25,
    fontFamily: 'segoeui',
  },
  date: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  container: {
    marginLeft: 20,
    marginRight: 5,
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
