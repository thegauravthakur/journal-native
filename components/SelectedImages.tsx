import {
  Dimensions,
  Image as Img,
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import Image from 'react-native-scalable-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useContext, useEffect, useState } from 'react';
import storage from '@react-native-firebase/storage';
import { format } from 'date-fns';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/atom';

export function SelectedImages({ images, setImages }) {
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(userState);
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
  }, []);
  if (loading) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }
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
      {images.length > 1 && (
        <ScrollView horizontal={true}>
          <View>
            <Image
              style={{ borderRadius: 10, marginRight: 5 }}
              height={190}
              source={images[0]}
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
              style={{ borderRadius: 10, ...(images[2] && { marginRight: 5 }) }}
              height={190}
              source={images[1]}
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
                  ...(images[3] && { marginRight: 5 }),
                }}
                height={190}
                source={images[2]}
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
                style={{ borderRadius: 10 }}
                height={190}
                source={images[3]}
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
