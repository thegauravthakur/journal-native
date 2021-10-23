import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ripple from 'react-native-material-ripple';
import { RecentImagePicker } from '../components/RecentImagePicker';
import { SelectedImages } from '../components/SelectedImages';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  activeDateState,
  descriptionInputState,
  spinnerState,
  themeState,
  titleInputState,
} from '../recoil/atom';
import {
  GiphyDialog,
  GiphyDialogEvent,
  GiphyDialogMediaSelectEventHandler,
  GiphyFileExtension,
  GiphySDK,
  GiphyThemePreset,
} from '@giphy/react-native-sdk';
import RNFS from 'react-native-fs';
import TaskViewTextInput from '../components/TaskViewTextInput';
import { GIPHY_KEY } from 'react-native-dotenv';
import {
  createNewEvent,
  deleteEvent,
  getAllEvents,
  getEventDataForDate,
  insertAndCleanImages,
} from '../services/transaction';
import { StackNavigationProp } from '@react-navigation/stack';
import colorScheme from '../constants/colorScheme';
import getStyles from './TaskView.styles';
import { RNCamera } from 'react-native-camera';
import { checkAndRequestCameraPermission } from '../services/permissions';

export function TaskView({ route }) {
  const [titleHeight, setTitleHeight] = useState();
  const [descriptionHeight, setDescriptionHeight] = useState();
  const { title, description, setData, isNew, imagesArray, _id } = route.params;
  const [inputTitle, setInputTitle] = useState(title);
  const setSpinner = useSetRecoilState(spinnerState);
  const [inputDescription, setInputDescription] = useState(description);
  const theme = useRecoilValue(themeState);
  const [images, setImages] = useState<{ uri: string; _id?: string }[]>(
    imagesArray,
  );
  const setTitle = useSetRecoilState(titleInputState);
  const setDescription = useSetRecoilState(descriptionInputState);
  const activeDate = useRecoilValue(activeDateState);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const Style = getStyles(theme);

  useEffect(() => {
    const myTheme = theme.charAt(0).toUpperCase() + theme.slice(1);
    GiphySDK.configure({ apiKey: GIPHY_KEY });
    GiphyDialog.configure({
      fileType: GiphyFileExtension.GIF,
      theme: GiphyThemePreset[myTheme],
    });
  }, [theme]);

  useEffect(() => {
    const handler: GiphyDialogMediaSelectEventHandler = e => {
      setSpinner({ visible: true, textContent: 'Loading...' });
      if (images.length < 4)
        RNFS.downloadFile({
          fromUrl: e.media.data.images.downsized.url,
          toFile: RNFS.DocumentDirectoryPath + '/test.gif',
        })
          .promise.then(() => {
            RNFS.readFile(RNFS.DocumentDirectoryPath + '/test.gif', 'base64')
              .then(result => {
                setImages(img => [
                  ...img,
                  { uri: 'data:image/gif;base64,' + result },
                ]);
              })
              .then(() => {
                setSpinner({ visible: false, textContent: '' });
                GiphyDialog.hide();
              })
              .catch(() => {
                setSpinner({ visible: false, textContent: '' });
                GiphyDialog.hide();
              });
          })
          .catch(() => GiphyDialog.hide());
    };
    const listener = GiphyDialog.addListener(
      GiphyDialogEvent.MediaSelected,
      handler,
    );
    return () => {
      listener.remove();
    };
  }, [images]);

  navigation.setOptions({
    title: isNew ? 'Add a memory' : 'Edit a memory',
    headerRight: () => (
      <Ripple
        onPress={async () => {
          const finalTitle = inputTitle.trim();
          const finalDescription = inputDescription.trim();
          if (
            finalTitle.length > 0 ||
            finalDescription.length > 0 ||
            images.length > 0
          )
            if (!isNew) {
              const Event = await getAllEvents();
              const target = Event.filtered(`_id == "${_id}"`);
              // @ts-ignore
              const Image = target[0].images;
              // @ts-ignore
              const imagesToDelete = Image.filter(image => {
                const hasImage = images.findIndex(img => img._id === image._id);
                return image._id && hasImage === -1;
              });
              await insertAndCleanImages(
                imagesToDelete,
                finalTitle,
                finalDescription,
                images,
                target,
              );
              ToastAndroid.show('Event added!', ToastAndroid.SHORT);
            } else await createNewEvent(finalTitle, finalDescription, images);
          else
            ToastAndroid.show(
              'Please add an image or a text!',
              ToastAndroid.SHORT,
            );

          setTitle('');
          setDescription('');
          setData(await getEventDataForDate(activeDate));
          navigation.goBack();
        }}
        style={Style.ripple}>
        <Text style={Style.ripple__button}>save</Text>
      </Ripple>
    ),
  });

  const onDeleteHandler = async () => {
    if (!isNew) {
      await deleteEvent(_id);
      setData(await getEventDataForDate(activeDate));
    }
    ToastAndroid.show('Event Deleted!', ToastAndroid.SHORT);
    navigation.goBack();
  };
  return (
    <View style={Style.container}>
      <ScrollView>
        <TaskViewTextInput
          inputTitle={inputTitle}
          setInputDescription={setInputDescription}
          inputDescription={inputDescription}
          setInputTitle={setInputTitle}
          descriptionHeight={descriptionHeight}
          setDescriptionHeight={setDescriptionHeight}
          setTitleHeight={setTitleHeight}
          titleHeight={titleHeight}
        />
        <SelectedImages images={images} setImages={setImages} />
      </ScrollView>
      <View>
        {images.length === 0 && <RecentImagePicker setImage={setImages} />}
        <View style={Style.footerWrapper}>
          <View style={Style.footerFirstHalf}>
            <Ripple
              rippleCentered
              onPress={() => GiphyDialog.show()}
              style={{ borderRadius: 100 }}>
              <Icon
                color={colorScheme[theme].text}
                style={Style.gifIcon}
                size={18}
                name={'gif'}
              />
            </Ripple>
            <Ripple
              rippleCentered
              onPress={() => {
                const limit = 4 - images.length;
                if (images.length < 4)
                  navigation.navigate('ImageGallery', {
                    setImages,
                    chooseLimit: limit,
                  });
              }}
              style={{ borderRadius: 100 }}>
              <Icon
                style={Style.pictureIcon}
                color={colorScheme[theme].text}
                size={27}
                name={'photo'}
              />
            </Ripple>
            <Ripple
              rippleCentered
              onPress={async () => {
                const result = await checkAndRequestCameraPermission();
                const limit = 4 - images.length;
                if (result && images.length < 4)
                  navigation.navigate('CameraScreen', {
                    setImages,
                    chooseLimit: limit,
                  });
              }}
              style={{ borderRadius: 100 }}>
              <Icon
                style={Style.pictureIcon}
                color={colorScheme[theme].text}
                size={27}
                name={'camera'}
              />
            </Ripple>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                borderRightWidth: 1,
                height: 30,
                marginRight: 5,
                borderColor: colorScheme[theme].subText,
              }}
            />
            <Ripple
              rippleCentered
              onPress={onDeleteHandler}
              style={{ borderRadius: 100 }}>
              <Icon
                style={Style.deleteIcon}
                color={colorScheme[theme].text}
                size={25}
                name={'delete'}
              />
            </Ripple>
          </View>
        </View>
      </View>
    </View>
  );
}
