import React, { useEffect, useState } from 'react';
import {
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ripple from 'react-native-material-ripple';
import { RecentImagePicker } from '../components/RecentImagePicker';
import { SelectedImages } from '../components/SelectedImages';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import uuid from 'react-native-uuid';
import {
  activeDateState,
  descriptionInputState,
  spinnerState,
  titleInputState,
} from '../recoil/atom';
import Realm from 'realm';
import { EventSchema, ImageSchema } from '../models/EventSchema';
import { endOfDay, startOfDay } from 'date-fns';
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

export function TaskView({ route }) {
  const [titleHeight, setTitleHeight] = useState();
  const [descriptionHeight, setDescriptionHeight] = useState();
  const { title, description, setData, isNew, imagesArray, _id } = route.params;
  const [inputTitle, setInputTitle] = useState(title);
  const setSpinner = useSetRecoilState(spinnerState);
  const [inputDescription, setInputDescription] = useState(description);
  const [images, setImages] = useState<Array<ImageSourcePropType>>(imagesArray);
  const setTitle = useSetRecoilState(titleInputState);
  const setDescription = useSetRecoilState(descriptionInputState);
  const activeDate = useRecoilValue(activeDateState);
  const navigation = useNavigation();

  const realm = new Realm({
    path: 'myrealm2.realm',
    schema: [EventSchema, ImageSchema],
  });

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
          // fromUrl: e.media.data.images.downsized_medium.url,
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
            setData(() => {
              if (!isNew) {
                const Event = realm.objects('Event');
                const target = Event.filtered(`_id == "${_id}"`);

                const Image = target[0].images;
                const imagesToDelete = Image.filter(image => {
                  const hasImage = images.findIndex(
                    img => img._id === image._id,
                  );
                  return image._id && hasImage === -1;
                });

                realm.write(() => {
                  realm.delete(imagesToDelete);
                  target[0].title = inputTitle;
                  target[0].description = inputDescription;
                  for (let i = 0; i < images.length; i++)
                    if (!images[i]._id) {
                      const image = realm.create('Image', {
                        _id: uuid.v4(),
                        url: images[i].uri,
                      });
                      target[0].images.push(image);
                    }
                });
              } else
                realm.write(() => {
                  const Event = realm.create('Event', {
                    _id: uuid.v4(),
                    title: inputTitle,
                    description: inputDescription,
                    createdAt: new Date(),
                  });

                  for (let i = 0; i < images.length; i++) {
                    const image = realm.create('Image', {
                      _id: uuid.v4(),
                      url: images[i].uri,
                    });
                    Event.images.push(image);
                  }
                });

              setTitle('');
              setDescription('');
              return realm
                .objects('Event')
                .filtered(
                  'createdAt >= $0 && createdAt <= $1',
                  startOfDay(activeDate),
                  endOfDay(activeDate),
                )
                .sorted('createdAt', true);
            });

          console.log('images length', realm.objects('Image').length);
          navigation.goBack();
        }}
        style={Style.ripple}>
        <Text style={Style.ripple__button}>submit</Text>
      </Ripple>
    ),
  });

  const onDeleteHandler = async () => {
    if (!isNew)
      setData(() => {
        const Event = realm.objects('Event');
        let target = Event.filtered(`_id == "${_id}"`);
        const Image = target[0].images;
        const imagesToDelete = Image.filter(image => image._id);

        realm.write(() => {
          realm.delete(imagesToDelete);
          realm.delete(target);
        });

        return realm
          .objects('Event')
          .filtered(
            'createdAt >= $0 && createdAt <= $1',
            startOfDay(activeDate),
            endOfDay(activeDate),
          )
          .sorted('createdAt', true);
      });

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
          setImages={setImages}
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
                const limit = 4 - images.length;
                if (images.length < 4)
                  navigation.navigate('ImageGallery', {
                    setImages,
                    chooseLimit: limit,
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