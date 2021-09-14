import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import CameraRoll, {
  PhotoIdentifier,
} from '@react-native-community/cameraroll';
import { FlatGrid } from 'react-native-super-grid';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs';

const pickerStyle = {
  inputIOS: {
    color: 'white',
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  inputAndroid: {
    color: 'white',
  },
  placeholderColor: 'white',
  underline: { borderTopWidth: 0 },
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};
const ImageGallery = ({ route }) => {
  const { setImages, chooseLimit } = route.params;
  const [mode, setMode] = useState('single');
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [choosenImages, setChoosenImages] = useState<string[]>([]);

  useEffect(() => {
    CameraRoll.getAlbums({ assetType: 'Photos' }).then(d => {
      const temp: any[] = [];
      d.forEach(data => {
        temp.push({
          label: data.title,
          value: { count: data.count, title: data.title },
        });
      });
      setAlbums(temp);
    });
  }, []);
  useEffect(() => {
    CameraRoll.getPhotos({
      assetType: 'Photos',
      first: 10000,
      ...(selectedAlbum !== '' && {
        groupTypes: 'Album',
        groupName: selectedAlbum,
      }),
    }).then(r => {
      setPhotos(r.edges);
    });
  }, [selectedAlbum]);
  const navigation = useNavigation();
  navigation.setOptions({
    title: '',
    headerRight: () => (
      <Ripple
        onPress={() => {
          const promiseToResolve = [];
          choosenImages.forEach(image => {
            const promise = RNFS.readFile(image, 'base64');
            promiseToResolve.push(promise);
          });
          Promise.all(promiseToResolve)
            .then(data => {
              const finalImages = [];
              data.forEach(img =>
                finalImages.push({ uri: 'data:image/jpg;base64,' + img }),
              );
              setImages(prevImages => [...prevImages, ...finalImages]);
            })
            .then(() => navigation.goBack());
        }}
        style={Style.ripple}>
        <Text>Submit</Text>
      </Ripple>
    ),
    headerLeft: () => (
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
        <Icon
          onPress={() => navigation.goBack()}
          style={{ padding: 10, marginRight: 5 }}
          size={25}
          name={'keyboard-backspace'}
        />
        <RNPickerSelect
          placeholder={{ label: 'All Images', value: null }}
          style={pickerStyle}
          useNativeAndroidPickerStyle={false}
          modalProps={{ style: { backgroundColor: 'red' } }}
          onValueChange={value => setSelectedAlbum(value ? value.title : '')}
          items={albums}>
          <Ripple style={Style.ripple}>
            <Text>{selectedAlbum === '' ? 'All Images' : selectedAlbum}</Text>
            <Icon
              style={{ marginLeft: 3 }}
              size={20}
              name={'keyboard-arrow-down'}
            />
          </Ripple>
        </RNPickerSelect>
      </View>
    ),
  });
  return (
    <>
      <FlatGrid
        spacing={5}
        data={photos}
        itemDimension={100}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ ...Style.image }}
            onLongPress={() => {
              setMode('multi');
              const temp = [...choosenImages, item.node.image.uri];
              setChoosenImages(temp);
            }}
            onPress={async () => {
              console.log(item.node);
              const checkIfAlredySelected =
                choosenImages.findIndex(img => img === item.node.image.uri) >
                -1;
              console.log(checkIfAlredySelected);
              if (mode === 'single') {
                if (chooseLimit > choosenImages.length) {
                  const base64 = await RNFS.readFile(
                    item.node.image.uri,
                    'base64',
                  );
                  // const base64 = await ImgToBase64.getBase64String(
                  //   item.node.image.uri,
                  // );
                  setImages(images => {
                    const temp = [...images];
                    temp.push({
                      uri: `data:${item.node.type};base64,` + base64,
                    });
                    return temp;
                  });
                  navigation.goBack();
                }
              } else {
                if (checkIfAlredySelected) {
                  const removedItem = choosenImages.filter(
                    img => img !== item.node.image.uri,
                  );
                  setChoosenImages(removedItem);
                  if (removedItem.length === 0) {
                    setMode('single');
                  }
                } else if (chooseLimit > choosenImages.length) {
                  console.log('not present');
                  const temp = [...choosenImages, item.node.image.uri];
                  setChoosenImages(temp);
                }
              }
            }}>
            <View>
              <Image
                style={{
                  ...Style.image,
                  ...(choosenImages.filter(img => img === item.node.image.uri)
                    .length > 0 && {
                    opacity: 0.4,
                  }),
                }}
                source={{ uri: item.node.image.uri }}
              />
              {choosenImages.findIndex(img => img === item.node.image.uri) >
                -1 && (
                <MaterialIcon
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    top: 40,
                    // top: 0,
                    // left: 0,
                    // right: 0,
                    // bottom: 0,
                  }}
                  color={'green'}
                  size={40}
                  name={'checkbox-marked-circle'}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};
export default ImageGallery;

const Style = StyleSheet.create({
  image: {
    height: 120,
    resizeMode: 'cover',
  },
  ripple: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
