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
import { useRecoilState, useSetRecoilState } from 'recoil';
import uuid from 'react-native-uuid';
import {
  descriptionInputState,
  titleInputState,
  userState,
} from '../recoil/atom';
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns';
import storage from '@react-native-firebase/storage';
import Progress from 'react-native-progress/Bar';

export function TaskView({ route }) {
  const [titleHeight, setTitleHeight] = useState(42);
  const [descriptionHeight, setDescriptionHeight] = useState(42);
  const {
    title,
    description,
    index,
    setData,
    isNew,
    imagesArray,
  } = route.params;
  const [inputTitle, setInputTitle] = useState(title);
  const [inputDescription, setInputDescription] = useState(description);
  const [images, setImages] = useState<Array<ImageSourcePropType>>(imagesArray);
  const [progressValue, setProgressValue] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const setTitle = useSetRecoilState(titleInputState);
  const setDescription = useSetRecoilState(descriptionInputState);
  const navigation = useNavigation();

  const uploadAllImages = async () => {
    setImageLoading(true);
    for (let i = 0; i < images.length; i++) {
      if (images[i].local) {
        const _uid = uuid.v4();
        const ref = await storage().ref(
          `${user?.uid}/${format(new Date(), 'dd-MM-yyyy')}/${_uid}`,
        );
        const task = await ref.putFile(images[i].uri);
        const total = (task.bytesTransferred / task.totalBytes) * 100;
        setProgressValue(total / ((images.length - i) * 10));
        images[i].uid = _uid;
        images[i].local = false;
        if (
          i === images.length - 1 &&
          task.bytesTransferred === task.totalBytes
        ) {
          setImageLoading(false);
          setProgressValue(1);
        }
      }
    }
  };
  navigation.setOptions({
    headerRight: () => (
      <Ripple
        onPress={async () => {
          setData(data => {
            const temp = [...data];
            if (!isNew) {
              temp[index] = {
                title: inputTitle,
                description: inputDescription,
                time: Date.now(),
                images,
                id: uuid.v4(),
              };
            } else {
              temp.unshift({
                title: inputTitle,
                description: inputDescription,
                time: Date.now(),
                images,
                id: uuid.v4(),
              });
            }
            setTitle('');
            setDescription('');
            if (user) {
              uploadAllImages().then(() => {
                firestore()
                  .collection(user.uid)
                  .doc(format(new Date(), 'dd-MM-yyyy'))
                  .set({ events: temp }, { merge: true })
                  .then(() => navigation.goBack());
              });
            }
            return temp;
          });
        }}
        style={Style.ripple}>
        <Text style={Style.ripple__button}>submit</Text>
      </Ripple>
    ),
  });

  const onDeleteHandler = async () => {
    setData(data => {
      const temp = [...data];
      temp.splice(index, 1);
      if (user) {
        firestore()
          .collection(user.uid)
          .doc(format(new Date(), 'dd-MM-yyyy'))
          .set({ events: temp }, { merge: true });
      }
      return temp;
    });
    navigation.goBack();
  };
  if (!user) {
    navigation.navigate('LoginView');
  }
  return (
    <View style={Style.container}>
      {imageLoading && <Progress progress={progressValue} width={null} />}
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
