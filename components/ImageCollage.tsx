import { Dimensions, Image as Img, StyleSheet, View, Text } from 'react-native';
import Image from 'react-native-scalable-image';
import React, { useEffect, useState } from 'react';
import storage from '@react-native-firebase/storage';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/atom';
import { format } from 'date-fns';

export function ImageCollage({ images }) {
  const [loading, setLoading] = useState(true);
  const [_images, setImages] = useState<String[]>(images);
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    const promises: any[] = [];
    const getAllPromises = () => {
      images.forEach(image => {
        const ref = storage().ref(
          `${user?.uid}/${format(new Date(), 'dd-MM-yyyy')}/${image.uid}`,
        );
        promises.push(ref.getDownloadURL());
      });
    };
    getAllPromises();
    Promise.all(promises).then(result => {
      const finalImageArray = [];
      for (let i = 0; i < result.length; i++) {
        finalImageArray.push({ uri: result[i], local: false });
      }
      setImages(finalImageArray);
      setLoading(false);
    });
  });
  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <View>
      {_images?.length === 1 && (
        <View style={Style.singleImgContainer}>
          <Image
            component={Img}
            style={Style.singleImage}
            width={Dimensions.get('window').width - 60}
            source={_images[0]}
          />
        </View>
      )}
      {_images?.length === 2 && (
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
              source={_images[0]}
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
              source={_images[1]}
            />
          </View>
        </View>
      )}
      {_images?.length === 4 && (
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
                source={_images[0]}
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
                source={_images[1]}
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
                source={_images[2]}
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
                source={_images[3]}
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
