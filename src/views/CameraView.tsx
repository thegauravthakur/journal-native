import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import { reduceSingleImageSize } from '../utils/imageManipulatioin';
import colorScheme from '../constants/colorScheme';
import Ripple from 'react-native-material-ripple';
import { useRecoilValue } from 'recoil';
import { themeState } from '../recoil/atom';

export const CameraApp = ({ route }) => {
  const { setImages, chooseLimit } = route.params;
  const ref = React.createRef();
  const navigation = useNavigation();
  const [limit, setLimit] = useState(chooseLimit);
  const theme = useRecoilValue(themeState);

  const takePicture = async () => {
    if (ref.current && limit > 0) {
      const options = { base64: true };
      const data = await ref.current.takePictureAsync(options);
      const base64 = await reduceSingleImageSize(data.uri, '');
      setImages(images => [...images, base64]);
      setLimit(limit - 1);
    }
  };
  navigation.setOptions({
    headerRight: () => {
      return (
        <Ripple
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.ripple}>
          <Text style={{ color: colorScheme[theme].text }}>
            {4 - limit} / 4 Clicked
          </Text>
        </Ripple>
      );
    },
  });
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
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
    click: {
      position: 'absolute',
      bottom: 30,
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 10,
      backgroundColor: '#9CA3AF',
    },
  });
  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
      />

      <View style={{ alignItems: 'center' }}>
        <Ripple onPress={takePicture} style={styles.click}>
          <Text style={{ color: 'white' }}>Snap</Text>
        </Ripple>
      </View>
    </View>
  );
};
