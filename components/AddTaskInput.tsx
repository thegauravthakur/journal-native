import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import Ripple from 'react-native-material-ripple';
import {
  activeDateState,
  descriptionInputState,
  titleInputState,
} from '../recoil/atom';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { isToday } from 'date-fns';

export function AddTaskInput({ setData }) {
  const navigation = useNavigation();
  const [title, setTitle] = useRecoilState(titleInputState);
  const [description, setDescription] = useRecoilState(descriptionInputState);
  const [show, setShow] = useState(false);
  const [titleHeight, setTitleHeight] = useState(42);
  const [descriptionHeight, setDescriptionHeight] = useState(42);
  const activeDate = useRecoilValue(activeDateState);
  const enableEdit = isToday(activeDate);
  let check = false;
  let check2 = false;
  return (
    <View style={Style.container}>
      {show && (
        <TextInput
          editable={enableEdit}
          onChangeText={e => setTitle(e)}
          multiline={true}
          style={{ ...Style.titleInput, height: titleHeight }}
          onContentSizeChange={e =>
            setTitleHeight(e.nativeEvent.contentSize.height)
          }
          onFocus={() => (check = true)}
          onBlur={() => {
            check = false;
            setTimeout(() => {
              if (!check2) {
                setShow(false);
              }
            }, 10);
          }}
          placeholder={'Title'}
          // style={Style.titleInput}
          placeholderTextColor={'black'}
        />
      )}
      <TextInput
        editable={enableEdit}
        onChangeText={e => setDescription(e)}
        style={{ ...Style.descriptionInput, height: descriptionHeight }}
        onContentSizeChange={e =>
          setDescriptionHeight(e.nativeEvent.contentSize.height)
        }
        onFocus={() => {
          check2 = true;
          setShow(true);
        }}
        onBlur={() => {
          check2 = false;
          setTimeout(() => {
            if (!check) {
              setShow(false);
            }
          }, 10);
        }}
        placeholder={'Take a note'}
        placeholderTextColor={'black'}
      />
      {show && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            // paddingHorizontal: 10,
            // paddingBottom: 5,
          }}>
          <Ripple
            rippleCentered
            onPress={() => {
              navigation.navigate('TaskView', {
                title,
                description,
                setData: setData,
                imagesArray: [],
                isNew: true,
              });
            }}
            style={{ borderRadius: 100 }}>
            <Ionicons
              color={'black'}
              onPress={() => {}}
              style={Style.expandIcon}
              size={18}
              name={'expand-outline'}
              accessibilityIgnoresInvertColors={true}
            />
          </Ripple>
        </View>
      )}
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    marginTop: -7,
    marginBottom: 20,
  },
  titleInput: {
    fontWeight: 'bold',
    color: 'black',
    padding: 0,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  descriptionInput: {
    color: 'black',
    padding: 0,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  expandIcon: {
    padding: 8,
  },
  pictureIcon: {},
});
