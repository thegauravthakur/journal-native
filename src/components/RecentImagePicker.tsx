import CameraRoll, {
  PhotoIdentifier,
} from '@react-native-community/cameraroll';
import {
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { reduceSingleImageSize } from '../utils/imageManipulatioin';
import { checkAndRequestPermission } from '../services/permissions';

export function RecentImagePicker({ setImage }) {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);

  useEffect(() => {
    checkAndRequestPermission().then(result => {
      if (result)
        CameraRoll.getPhotos({
          first: 10,
          assetType: 'Photos',
        })
          .then(r => {
            setPhotos(r.edges);
          })
          .catch(err => {
            console.log(err);
          });
    });
  }, []);

  return (
    <View>
      <ScrollView horizontal={true}>
        {photos.map((p, i) => {
          return (
            <TouchableHighlight
              key={p.node.image.uri}
              style={{ ...Style.image }}
              onPress={async () => {
                const reducedImg = await reduceSingleImageSize(
                  p.node.image.uri,
                  p.node.type,
                );
                setImage(images => {
                  const temp = [...images];
                  temp.push(reducedImg);
                  return temp;
                });
              }}>
              <Image
                style={{ ...Style.image, margin: 0 }}
                key={i}
                source={{ uri: p.node.image.uri }}
              />
            </TouchableHighlight>
          );
        })}
      </ScrollView>
    </View>
  );
}

const Style = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
});
