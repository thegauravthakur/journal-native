import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import { reduceSingleImageSize } from '../utils/imageManipulatioin';
import colorScheme from '../constants/colorScheme';
import Ripple from 'react-native-material-ripple';
import { useRecoilValue } from 'recoil';
import { themeState } from '../recoil/atom';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LogLevel, RNFFmpeg, RNFFprobe } from 'react-native-ffmpeg';
import RNFS from 'react-native-fs';

export const CameraApp = ({ route }) => {
  const [mode, setMode] = useState('Camera');
  const { setImages, chooseLimit } = route.params;
  const ref = React.createRef<RNCamera>();
  const navigation = useNavigation();
  const [limit, setLimit] = useState(chooseLimit);
  const theme = useRecoilValue(themeState);
  const [recording, setRecording] = useState(false);
  const takePicture = async () => {
    if (ref.current && limit > 0) {
      const options = { base64: true };
      const data = await ref.current.takePictureAsync(options);
      const base64 = await reduceSingleImageSize(data.uri, '');
      setImages(images => [...images, base64]);
      setLimit(limit - 1);
    }
  };
  const startRecording = async () => {
    if (ref.current && limit > 0) {
      const { uri } = await ref.current.recordAsync({
        maxDuration: 5,
        quality: '720p',
      });
      let outputPath = 'file://' + RNFS.DocumentDirectoryPath + '/output.gif';

      RNFFmpeg.executeAsync(
        `-y -i ${uri} -vf fps=5,scale=400:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse -loop 0 ${outputPath}`,
        async () => {},
      )
        .then(async () => {
          const base64 = await RNFS.readFile(outputPath, 'base64');
          setImages(images => [
            ...images,
            { uri: 'data:image/gif;base64,' + base64 },
          ]);
          setLimit(limit - 1);
        })
        .finally(() => {
          navigation.goBack();
        });
      setRecording(true);
    }
  };
  const stopRecording = async () => {
    if (ref.current && limit > 0) {
      ref.current.stopRecording();
      setRecording(false);
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

        <Ripple
          style={styles.ripple}
          onPress={() => {
            setMode(mode === 'Camera' ? 'GIF' : 'Camera');
          }}>
          <Text style={{ color: colorScheme[theme].text }}>
            {mode === 'GIF' ? 'Record GIF' : mode}
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
        onRecordingStart={d => {
          setRecording(true);
        }}
        onRecordingEnd={() => {
          setRecording(false);
        }}
        captureAudio={false}
        ref={ref}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
      />

      <View style={{ alignItems: 'center' }}>
        <Ripple
          onPress={
            mode === 'Camera'
              ? takePicture
              : recording
              ? stopRecording
              : startRecording
          }
          style={styles.click}>
          <Text style={{ color: 'white' }}>
            {mode === 'Camera'
              ? 'Camera'
              : recording
              ? 'Stop Recording'
              : 'Start Recording'}
          </Text>
        </Ripple>
      </View>
    </View>
  );
};
