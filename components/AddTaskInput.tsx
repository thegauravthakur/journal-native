import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { descriptionInputState, titleInputState } from '../recoil/atom';

export function AddTaskInput({}) {
  const [title, setTitle] = useRecoilState(titleInputState);
  const [description, setDescription] = useRecoilState(descriptionInputState);
  const [show, setShow] = useState(false);
  const [titleHeight, setTitleHeight] = useState(42);
  const [descriptionHeight, setDescriptionHeight] = useState(42);
  let check = false;
  let check2 = false;
  return (
    <View style={Style.container}>
      {show && (
        <TextInput
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
});
