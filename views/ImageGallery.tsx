import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableHighlightComponent,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';
import CameraRoll, {
  PhotoIdentifier,
} from '@react-native-community/cameraroll';
import { FlatGrid } from 'react-native-super-grid';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import Ripple from 'react-native-material-ripple';
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
  const { setImages, images } = route.params;
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState('');
  useEffect(() => {
    images.forEach(e => console.log(e));
  }, []);
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
    headerRight: () => (
      <RNPickerSelect
        placeholder={{ label: 'All Images', value: null }}
        style={pickerStyle}
        useNativeAndroidPickerStyle={false}
        modalProps={{ style: { backgroundColor: 'red' } }}
        onValueChange={value => setSelectedAlbum(value ? value.title : '')}
        items={albums}>
        <Ripple style={Style.ripple}>
          <Text>{'Choose Album'}</Text>
        </Ripple>
      </RNPickerSelect>
    ),
    title: selectedAlbum === '' ? 'All Images' : selectedAlbum,
  });
  return (
    <FlatGrid
      spacing={5}
      data={photos}
      itemDimension={100}
      renderItem={({ item }) => (
        <TouchableHighlight
          disabled={
            images.filter(img => img.uri === item.node.image.uri).length > 0
          }
          style={{ ...Style.image }}
          onPress={() => {
            setImages(images => {
              const temp = [...images];
              temp.push({ uri: item.node.image.uri });
              return temp;
            });
            navigation.goBack();
          }}>
          <Image
            style={{
              ...Style.image,
              ...(images.filter(img => img.uri === item.node.image.uri).length >
                0 && {
                opacity: 0.5,
              }),
            }}
            source={{ uri: item.node.image.uri }}
          />
        </TouchableHighlight>
      )}
    />
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
  },
});
