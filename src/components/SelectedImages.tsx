import { Dimensions, Image as Img, View, ScrollView } from 'react-native';
import Image from 'react-native-scalable-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import colorScheme from '../constants/colorScheme';
import { useRecoilValue } from 'recoil';
import { themeState } from '../recoil/atom';
import getStyles from './SelectedImages.styles';

export function SelectedImages({ images, setImages }) {
  const theme = useRecoilValue(themeState);
  const Style = getStyles(theme);

  return (
    <View>
      {images.length === 1 && (
        <View style={Style.imgContainer}>
          <Image
            component={Img}
            style={Style.image}
            width={Dimensions.get('window').width - 40}
            source={{ uri: images[0]._id ? images[0].uri : images[0].uri }}
          />
          <Icon
            onPress={() => {
              const temp = [...images];
              temp.splice(0, 1);
              setImages(temp);
            }}
            name={'close'}
            size={20}
            style={Style.closeIcon}
          />
        </View>
      )}
      {images.length > 1 && (
        <ScrollView horizontal={true} style={{ marginVertical: 20 }}>
          <View>
            <Image
              style={{
                borderRadius: 10,
                marginLeft: 5,
                overlayColor: colorScheme[theme].overlayColor,
              }}
              height={190}
              source={{ uri: images[0]._id ? images[0].uri : images[0].uri }}
            />
            <Icon
              onPress={() => {
                const temp = [...images];
                temp.splice(0, 1);
                setImages(temp);
              }}
              name={'close'}
              size={15}
              style={{
                position: 'absolute',
                right: 10,
                top: 10,
                backgroundColor: '#172234',
                color: 'white',
                borderRadius: 25,
                padding: 1,
              }}
            />
          </View>
          <View>
            <Image
              style={{
                borderRadius: 10,
                marginLeft: 5,
                overlayColor: colorScheme[theme].overlayColor,
              }}
              height={190}
              source={{ uri: images[1]._id ? images[1].uri : images[1].uri }}
            />
            <Icon
              onPress={() => {
                const temp = [...images];
                temp.splice(1, 1);
                setImages(temp);
              }}
              name={'close'}
              size={15}
              style={{
                position: 'absolute',
                right: 10,
                top: 10,
                backgroundColor: '#172234',
                color: 'white',
                borderRadius: 25,
                padding: 1,
              }}
            />
          </View>
          {images[2] && (
            <View>
              <Image
                style={{
                  borderRadius: 10,
                  marginLeft: 5,
                  overlayColor: colorScheme[theme].overlayColor,
                }}
                height={190}
                source={{ uri: images[2]._id ? images[2].uri : images[2].uri }}
              />
              <Icon
                onPress={() => {
                  const temp = [...images];
                  temp.splice(2, 1);
                  setImages(temp);
                }}
                name={'close'}
                size={15}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  backgroundColor: '#172234',
                  color: 'white',
                  borderRadius: 25,
                  padding: 1,
                }}
              />
            </View>
          )}
          {images[3] && (
            <View>
              <Image
                style={{
                  borderRadius: 10,
                  marginLeft: 5,
                  overlayColor: colorScheme[theme].overlayColor,
                }}
                height={190}
                source={{ uri: images[3]._id ? images[3].uri : images[3].uri }}
              />
              <Icon
                onPress={() => {
                  const temp = [...images];
                  temp.splice(3, 1);
                  setImages(temp);
                }}
                name={'close'}
                size={15}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  backgroundColor: '#172234',
                  color: 'white',
                  borderRadius: 25,
                  padding: 1,
                }}
              />
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
