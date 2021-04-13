import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ripple from 'react-native-material-ripple';

export function TaskView({ route }) {
  const [titleHeight, setTitleHeight] = useState(42);
  const [descriptionHeight, setDescriptionHeight] = useState(42);
  const { title, description, index, setData } = route.params;
  const [inputTitle, setInputTitle] = useState(title);
  const [inputDescription, setInputDescription] = useState(description);
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
  return (
    <View>
      <TextInput
        onChangeText={e => setInputTitle(e)}
        defaultValue={title}
        multiline={true}
        style={{ ...Style.titleInput, height: titleHeight }}
        onContentSizeChange={e =>
          setTitleHeight(e.nativeEvent.contentSize.height)
        }
        placeholder={'Title'}
        // style={Style.titleInput}
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
    // backgroundColor: '#2563EB',
  },
  ripple__button: {
    // color: 'white',
    color: 'black',
  },
});
