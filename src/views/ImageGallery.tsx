import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Vibration,
} from 'react-native';
import CameraRoll, {
  PhotoIdentifier,
} from '@react-native-community/cameraroll';
import { FlatGrid } from 'react-native-super-grid';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { reduceSingleImageSize } from '../utils/imageManipulatioin';
import { IChosenImage } from './types/ImageGallery.types';
import colorScheme from '../constants/colorScheme';
import { useRecoilValue } from 'recoil';
import { themeState } from '../recoil/atom';
import Modal from 'react-native-modal';

const ImageGallery = ({ route }) => {
  const { setImages, chooseLimit } = route.params;
  const [mode, setMode] = useState('single');
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [chosenImages, setChosenImages] = useState<IChosenImage[]>([]);
  const [showModal, setShowModal] = useState(false);
  const theme = useRecoilValue(themeState);
  const navigation = useNavigation();

  useEffect(() => {
    CameraRoll.getAlbums({ assetType: 'Photos' }).then(d => {
      const temp: { label: string }[] = [];
      d.forEach(data => {
        temp.push({
          label: data.title,
          // value: { count: data.count, title: data.title },
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
      borderColor: colorScheme[theme].subText,
    },
  });

  navigation.setOptions({
    title: '',
    headerRight: () => (
      <Ripple
        onPress={() => {
          const promiseToResolve: Promise<{ uri: string }>[] = [];
          chosenImages.forEach(image => {
            const promise = reduceSingleImageSize(image.uri, image.type);
            promiseToResolve.push(promise);
          });

          Promise.all(promiseToResolve)
            .then(data => {
              const finalImages: { uri: string }[] = [];
              data.forEach(img => finalImages.push(img));
              setImages(prevImages => [...prevImages, ...finalImages]);
            })
            .then(() => navigation.goBack());
        }}
        style={Style.ripple}>
        <Text style={{ color: colorScheme[theme].text }}>
          {chosenImages.length === 0
            ? 'Submit'
            : `Add ${chosenImages.length} ${
                chosenImages.length === 1 ? 'image' : 'images'
              }`}
        </Text>
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
          color={colorScheme[theme].subText}
        />

        <Ripple style={Style.ripple} onPress={() => setShowModal(true)}>
          <Text style={{ color: colorScheme[theme].text }}>
            {selectedAlbum === ''
              ? 'All Images'
              : selectedAlbum.length > 15
              ? selectedAlbum.substring(0, 15 - 3) + '...'
              : selectedAlbum}
          </Text>
          <Icon
            style={{ marginLeft: 3, color: colorScheme[theme].subText }}
            size={20}
            name={'keyboard-arrow-down'}
          />
        </Ripple>
      </View>
    ),
  });
  return (
    <>
      <Modal
        onBackButtonPress={() => setShowModal(false)}
        onBackdropPress={() => setShowModal(false)}
        isVisible={showModal}>
        <View
          style={{
            backgroundColor: colorScheme[theme].card,
            padding: 20,
            borderRadius: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              setSelectedAlbum('');
              setShowModal(false);
            }}
            style={{ paddingVertical: 20 }}>
            <Text style={{ color: colorScheme[theme].subText }}>
              All Images
            </Text>
          </TouchableOpacity>
          {albums.map(({ label }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedAlbum(label);
                setShowModal(false);
              }}
              style={{ paddingBottom: 20 }}>
              <Text style={{ color: colorScheme[theme].subText }}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <FlatGrid
        spacing={5}
        data={photos}
        itemDimension={100}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ ...Style.image }}
            onLongPress={() => {
              setMode('multi');
              const temp = [
                ...chosenImages,
                { uri: item.node.image.uri, type: item.node.type },
              ];
              setChosenImages(temp);
              Vibration.vibrate(30);
            }}
            onPress={async () => {
              console.log(item.node);
              const checkIfAlreadySelected =
                chosenImages.findIndex(img => img.uri === item.node.image.uri) >
                -1;

              if (mode === 'single') {
                if (chooseLimit > chosenImages.length) {
                  const base64 = await reduceSingleImageSize(
                    item.node.image.uri,
                    item.node.type,
                  );
                  setImages(images => {
                    const temp = [...images];
                    temp.push(base64);
                    return temp;
                  });
                  navigation.goBack();
                }
              } else if (checkIfAlreadySelected) {
                const removedItem = chosenImages.filter(
                  img => img.uri !== item.node.image.uri,
                );
                setChosenImages(removedItem);
                if (removedItem.length === 0) setMode('single');
              } else if (chooseLimit > chosenImages.length) {
                const temp = [
                  ...chosenImages,
                  { uri: item.node.image.uri, type: item.node.type },
                ];
                setChosenImages(temp);
              }
            }}>
            <View>
              <Image
                style={{
                  ...Style.image,
                  ...(chosenImages.filter(
                    img => img.uri === item.node.image.uri,
                  ).length > 0 && {
                    opacity: 0.4,
                  }),
                }}
                source={{ uri: item.node.image.uri }}
              />
              {chosenImages.findIndex(img => img.uri === item.node.image.uri) >
                -1 && (
                <MaterialIcon
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    top: 40,
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
