import React, { useState } from 'react';
import {
  ImageSourcePropType,
  PermissionsAndroid,
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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export function TaskView({ route }) {
  const [titleHeight, setTitleHeight] = useState(42);
  const [descriptionHeight, setDescriptionHeight] = useState(42);
  const { title, description, index, setData } = route.params;
  const [inputTitle, setInputTitle] = useState(title);
  const [inputDescription, setInputDescription] = useState(description);
  const [images, setImages] = useState<Array<ImageSourcePropType>>([]);
  const navigation = useNavigation();
  navigation.setOptions({
    headerRight: () => (
      <Ripple
        onPress={() => {
          setData(data => {
            const temp = [...data];
            temp[index] = {
              title: inputTitle,
              description: inputDescription,
              time: Date.now(),
            };
            return temp;
          });
          navigation.goBack();
        }}
        style={Style.ripple}>
        <Text style={Style.ripple__button}>submit</Text>
      </Ripple>
    ),
  });

  const onDeleteHandler = () => {
    setData(data => {
      const temp = [...data];
      temp.splice(index, 1);
      return temp;
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
              onPress={() =>
                launchImageLibrary({ mediaType: 'photo' }, ({ uri }) => {
                  const temp = [...images];
                  temp.push({ uri });
                  setImages(temp);
                })
              }
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
