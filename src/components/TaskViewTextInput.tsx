import { StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { themeState } from '../recoil/atom';
import colorScheme from '../constants/colorScheme';

const TaskViewTextInput = ({
  inputTitle,
  setInputTitle,
  titleHeight,
  inputDescription,
  setInputDescription,
  descriptionHeight,
  setDescriptionHeight,
  setTitleHeight,
}) => {
  const theme = useRecoilValue(themeState);
  const Style = StyleSheet.create({
    titleInput: {
      fontWeight: 'bold',
      color: colorScheme[theme].text,
      padding: 0,
      fontSize: 19,
      paddingVertical: 10,
      paddingHorizontal: 5,
      fontFamily: 'segoeui',
    },
    descriptionInput: {
      color: colorScheme[theme].text,
      padding: 0,
      fontSize: 16,
      paddingHorizontal: 5,
      lineHeight: 25,
      fontFamily: 'segoeui',
    },
  });
  return (
    <>
      <TextInput
        onChangeText={e => setInputTitle(e)}
        defaultValue={inputTitle}
        multiline={true}
        style={{ ...Style.titleInput, height: titleHeight }}
        onContentSizeChange={e =>
          setTitleHeight(e.nativeEvent.contentSize.height)
        }
        placeholder={'Title'}
        placeholderTextColor={colorScheme[theme].subText}
      />
      <TextInput
        value={inputDescription}
        multiline={true}
        onChangeText={e => setInputDescription(e)}
        style={{
          ...Style.descriptionInput,
          ...{ height: descriptionHeight },
        }}
        onContentSizeChange={e => {
          console.log(
            'onContentSizeChange called!' +
              e.nativeEvent.contentSize.height.toString(),
          );
          console.log(e.currentTarget);
          setDescriptionHeight(e.nativeEvent.contentSize.height);
        }}
        placeholder={'Add a memory...'}
        placeholderTextColor={colorScheme[theme].subText}
      />
    </>
  );
};

export default TaskViewTextInput;
