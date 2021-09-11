import React, { useState } from 'react';
import {
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
  titleInputState,
} from '../recoil/atom';
import Realm from 'realm';
import { EventSchema, ImageSchema } from '../db/EventSchema';
import { endOfDay, startOfDay } from 'date-fns';

export function TaskView({ route }) {
  const [titleHeight, setTitleHeight] = useState(42);
  const [descriptionHeight, setDescriptionHeight] = useState(42);
  const { title, description, setData, isNew, imagesArray, _id } = route.params;
  const [inputTitle, setInputTitle] = useState(title);
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

  navigation.setOptions({
    headerRight: () => (
      <Ripple
        onPress={async () => {
          setData(data => {
            if (!isNew) {
              const Event = realm.objects('Event');
              const target = Event.filtered(`_id == "${_id}"`);
              realm.write(() => {
                target[0].title = inputTitle;
                target[0].description = inputDescription;
                for (let i = 0; i < images.length; i++) {
                  if (!images[i]._id) {
                    const image = realm.create('Image', {
                      _id: uuid.v4(),
                      url: images[i].uri,
                    });
                    target[0].images.push(image);
                  }
                }
              });
            } else {
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
            }
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
          navigation.goBack();
        }}
        style={Style.ripple}>
        <Text style={Style.ripple__button}>submit</Text>
      </Ripple>
    ),
  });

  const onDeleteHandler = async () => {
    setData(data => {
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
        <TextInput
          onChangeText={e => setInputTitle(e)}
          defaultValue={title}
          multiline={true}
          style={{ ...Style.titleInput, height: titleHeight }}
          onContentSizeChange={e =>
            setTitleHeight(e.nativeEvent.contentSize.height)
          }
          placeholder={'Title'}
          placeholderTextColor={'black'}
        />
        <TextInput
          defaultValue={description}
          multiline
          onChangeText={e => setInputDescription(e)}
          style={{ ...Style.descriptionInput, height: descriptionHeight }}
          onContentSizeChange={e =>
            setDescriptionHeight(e.nativeEvent.contentSize.height)
          }
          placeholder={'Take a note'}
          placeholderTextColor={'black'}
        />
        <SelectedImages images={images} setImages={setImages} />
      </ScrollView>
      <View>
        {images.length === 0 && <RecentImagePicker setImage={setImages} />}
        <View style={Style.footerWrapper}>
          <View style={Style.footerFirstHalf}>
            <Icon style={Style.gifIcon} size={18} name={'gif'} />
            <Icon
              onPress={() => {
                if (images.length < 4) {
                  navigation.navigate('ImageGallery', {
                    setImages,
                    images,
                  });
                }
              }}
              style={Style.pictureIcon}
              size={27}
              name={'photo'}
            />
          </View>
          <Icon
            onPress={onDeleteHandler}
            style={Style.deleteIcon}
            size={25}
            name={'delete'}
          />
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
    paddingVertical: 10,
  },
  footerFirstHalf: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deleteIcon: {
    borderLeftWidth: 1,
    paddingLeft: 10,
  },
  gifIcon: {
    borderWidth: 1,
    marginRight: 20,
  },
  pictureIcon: {},
});
