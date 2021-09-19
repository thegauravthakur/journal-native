import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
import getRealm from '../services/realm';
import { PermissionModal } from '../components/PermissionModal';
import { check, PERMISSIONS } from 'react-native-permissions';
import { checkIfPermissionAreGranted } from '../services/permissions';

export function TaskView({ route }) {
  const [titleHeight, setTitleHeight] = useState();
  const [descriptionHeight, setDescriptionHeight] = useState();
  const { title, description, setData, isNew, imagesArray, _id } = route.params;
  const [inputTitle, setInputTitle] = useState(title);
  const setSpinner = useSetRecoilState(spinnerState);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [inputDescription, setInputDescription] = useState(description);
  const [images, setImages] = useState<{ uri: string; _id?: string }[]>(
    imagesArray,
  );
  const setTitle = useSetRecoilState(titleInputState);
  const setDescription = useSetRecoilState(descriptionInputState);
  const activeDate = useRecoilValue(activeDateState);
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    GiphySDK.configure({ apiKey: GIPHY_KEY });
    GiphyDialog.configure({
      fileType: GiphyFileExtension.GIF,
      theme: GiphyThemePreset.Light,
    });
  }, []);

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
    headerRight: () => (
      <Ripple
        onPress={async () => {
          if (
            inputTitle.length > 0 ||
            inputDescription.length > 0 ||
            images.length > 0
          )
            if (!isNew) {
              const Event = await getAllEvents();
              const target = Event.filtered(`_id == "${_id}"`);

              const Image = target[0].images;
              // @ts-ignore
              const imagesToDelete = Image.filter(image => {
                const hasImage = images.findIndex(img => img._id === image._id);
                return image._id && hasImage === -1;
              });
              await insertAndCleanImages(
                imagesToDelete,
                inputTitle,
                inputDescription,
                images,
                target,
              );
            } else await createNewEvent(inputTitle, inputDescription, images);

          setTitle('');
          setDescription('');
          setData(await getEventDataForDate(activeDate));
          navigation.goBack();
        }}
        style={Style.ripple}>
        <Text style={Style.ripple__button}>submit</Text>
      </Ripple>
    ),
  });

  const onDeleteHandler = async () => {
    const realm = await getRealm();
    console.log('total images before delete: ' + realm.objects('Image').length);
    if (!isNew) {
      await deleteEvent(_id);
      setData(await getEventDataForDate(activeDate));
    }
    console.log('total images after delete: ' + realm.objects('Image').length);
    navigation.goBack();
  };

  return (
    <View style={Style.container}>
      <PermissionModal
        showPermissionModal={showPermissionModal}
        setShowPermissionModal={setShowPermissionModal}
      />
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
              <Icon style={Style.gifIcon} size={18} name={'gif'} />
            </Ripple>
            <Ripple
              rippleCentered
              onPress={() => {
                checkIfPermissionAreGranted().then(result => {
                  if (result) {
                    const limit = 4 - images.length;
                    if (images.length < 4)
                      navigation.navigate('ImageGallery', {
                        setImages,
                        chooseLimit: limit,
                      });
                  } else setShowPermissionModal(true);
                });
              }}
              style={{ borderRadius: 100 }}>
              <Icon style={Style.pictureIcon} size={27} name={'photo'} />
            </Ripple>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ borderRightWidth: 1, height: 30, marginRight: 5 }} />
            <Ripple
              rippleCentered
              onPress={onDeleteHandler}
              style={{ borderRadius: 100 }}>
              <Icon style={Style.deleteIcon} size={25} name={'delete'} />
            </Ripple>
          </View>
        </View>
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titleInput: {
    fontWeight: 'bold',
    color: 'black',
    padding: 0,
    fontSize: 19,
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontFamily: 'segoeui',
  },
  descriptionInput: {
    color: 'black',
    padding: 0,
    fontSize: 16,
    paddingHorizontal: 5,
    lineHeight: 25,
    fontFamily: 'segoeui',
  },
  icon: {
    borderRadius: 100,
    padding: 9,
  },
  ripple: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  ripple__button: {
    color: 'black',
  },
  footerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  footerFirstHalf: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deleteIcon: {
    padding: 10,
  },
  gifIcon: {
    borderWidth: 1,
    marginHorizontal: 10,
  },
  pictureIcon: {
    padding: 10,
  },
});
