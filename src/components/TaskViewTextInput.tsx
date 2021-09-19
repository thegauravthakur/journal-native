import { StyleSheet, Text, TextInput, useWindowDimensions } from 'react-native';
import React, { useEffect } from 'react';

const TaskViewTextInput = ({
  inputTitle,
  setInputTitle,
  titleHeight,
  inputDescription,
  setInputDescription,
  descriptionHeight,
  setDescriptionHeight,
  setTitleHeight,
  setImages,
}) => {
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
        placeholderTextColor={'black'}
      />
      {/*<Text>*/}
      {/*  Description heihgt: {descriptionHeight} {inputDescription.length}*/}
      {/*</Text>*/}
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
        placeholder={'Take a note'}
        placeholderTextColor={'black'}
      />
    </>
  );
};

const Style = StyleSheet.create({
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
});

export default TaskViewTextInput;
