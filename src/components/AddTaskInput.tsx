import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import Ripple from 'react-native-material-ripple';
import {
  activeDateState,
  descriptionInputState,
  themeState,
  titleInputState,
} from '../recoil/atom';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { isToday } from 'date-fns';
import { StackNavigationProp } from '@react-navigation/stack';
import colorScheme from '../constants/colorScheme';

export function AddTaskInput({ setData }) {
  const navigation = useNavigation<StackNavigationProp<any>>(); //todo
  const [title, setTitle] = useRecoilState(titleInputState);
  const [description, setDescription] = useRecoilState(descriptionInputState);
  const [show, setShow] = useState(false);
  const [titleHeight, setTitleHeight] = useState(42);
  const [descriptionHeight, setDescriptionHeight] = useState(42);
  const activeDate = useRecoilValue(activeDateState);
  const ref = useRef<TextInput>(null);
  const theme = useRecoilValue(themeState);
  const enableEdit = isToday(activeDate);
  let check = false;
  let check2 = false;

  const Style = StyleSheet.create({
    container: {
      borderWidth: 1,
      marginHorizontal: 5,
      borderRadius: 10,
      borderColor: colorScheme[theme].subText,
      marginTop: -7,
      marginBottom: 20,
    },
    titleInput: {
      fontWeight: 'bold',
      color: colorScheme[theme].text,
      padding: 0,
      fontSize: 18,
      paddingVertical: 10,
      paddingHorizontal: 5,
    },
    descriptionInput: {
      color: colorScheme[theme].text,
      padding: 0,
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 5,
    },
    expandIcon: {
      padding: 8,
    },
  });

  return (
    <View style={Style.container}>
      {show && (
        <TextInput
          ref={ref}
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
              if (!check2) setShow(false);
            }, 10);
          }}
          placeholder={'Title'}
          placeholderTextColor={colorScheme[theme].subText}
        />
      )}
      <TextInput
        editable={enableEdit}
        onChangeText={e => setDescription(e)}
        multiline={true}
        style={{ ...Style.descriptionInput, height: descriptionHeight }}
        onContentSizeChange={e =>
          setDescriptionHeight(e.nativeEvent.contentSize.height)
        }
        onFocus={() => {
          check2 = true;
          setShow(true);
          setTimeout(() => {
            if (ref.current) ref.current.setNativeProps({ text: title });
          }, 10);
        }}
        onBlur={() => {
          check2 = false;
          setTimeout(() => {
            if (!check) setShow(false);
          }, 10);
        }}
        placeholder={'Add a memory'}
        placeholderTextColor={colorScheme[theme].subText}
      />
      {show && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
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
              color={colorScheme[theme].text}
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
