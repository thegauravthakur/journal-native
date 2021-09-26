import { StyleSheet } from 'react-native';
import colorScheme from '../constants/colorScheme';

export default theme => {
  return StyleSheet.create({
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
};
