import { Dimensions, Image as Img, StyleSheet, View } from 'react-native';
import Image from 'react-native-scalable-image';
import React from 'react';

export function ImageCollage({ images }) {
  return (
    <View>
      {images?.length === 1 && (
        <View style={Style.singleImgContainer}>
          <Image
            component={Img}
            style={Style.singleImage}
            width={Dimensions.get('window').width - 60}
            source={images[0]}
          />
        </View>
      )}
      {images?.length === 2 && (
        <View style={Style.twoImageOuterWrapper}>
          <View style={Style.twoImageWrapper}>
            <Img
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
              }}
              source={images[0]}
            />
          </View>
          <View style={Style.twoImageWrapper}>
            <Img
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
                marginLeft: 1,
              }}
              source={images[1]}
            />
          </View>
        </View>
      )}
      {images?.length === 4 && (
        <View>
          <View style={Style.twoImageOuterWrapper}>
            <View style={Style.twoImageWrapper}>
              <Img
                style={{
                  width: '100%',
                  height: undefined,
                  aspectRatio: 1,
                  borderTopLeftRadius: 15,
                }}
                source={images[0]}
              />
            </View>
            <View style={Style.twoImageWrapper}>
              <Img
                style={{
                  width: '100%',
                  height: undefined,
                  aspectRatio: 1,
                  borderTopRightRadius: 15,
                  marginLeft: 1,
                }}
                source={images[1]}
              />
            </View>
          </View>
          <View style={{ ...Style.FourImageOuterWrapper }}>
            <View style={Style.twoImageWrapper}>
              <Img
                style={{
                  width: '100%',
                  height: undefined,
                  aspectRatio: 1,
                  borderBottomLeftRadius: 15,
                }}
                source={images[2]}
              />
            </View>
            <View style={Style.twoImageWrapper}>
              <Img
                style={{
                  width: '100%',
                  height: undefined,
                  aspectRatio: 1,
                  borderBottomRightRadius: 15,
                  marginLeft: 1,
                }}
                source={images[3]}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const Style = StyleSheet.create({
  singleImage: {
    marginTop: 20,
    borderRadius: 15,
  },
  singleImgContainer: {
    flex: 1,
    alignItems: 'center',
  },
  twoImageOuterWrapper: { flexDirection: 'row', marginTop: 20 },
  FourImageOuterWrapper: { flexDirection: 'row' },
  twoImageWrapper: { maxWidth: '50%' },
});
