import { StyleSheet } from 'react-native';
import colorScheme from '../constants/colorScheme';

export default theme => {
  return StyleSheet.create({
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
};
