import { Dimensions, Image as Img, StyleSheet, View } from 'react-native';
import Image from 'react-native-scalable-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

export function SelectedImages({ images, setImages }) {
  return (
    <View>
      {images.length === 1 && (
        <View style={Style.imgContainer}>
          <Image
            component={Img}
            style={Style.image}
            width={Dimensions.get('window').width - 40}
            source={images[0]}
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
    </View>
  );
}

const Style = StyleSheet.create({
  image: {
    marginVertical: 20,
    borderRadius: 15,
  },
  imgContainer: {
    flex: 1,
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 40,
    right: 40,
    backgroundColor: '#172234',
    color: 'white',
    borderRadius: 25,
    padding: 2,
  },
});
