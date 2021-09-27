import { StyleSheet } from 'react-native';
import colorScheme from '../constants/colorScheme';

export default theme => {
  return StyleSheet.create({
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
      color: colorScheme[theme].text,
      borderColor: colorScheme[theme].text,
    },
    ripple__button: {
      color: colorScheme[theme].text,
    },
    footerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      marginVertical: 5,
    },
    footerFirstHalf: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    deleteIcon: {
      padding: 10,
    },
    gifIcon: {
      borderWidth: 1,
      marginHorizontal: 10,
      borderColor: colorScheme[theme].text,
    },
    pictureIcon: {
      padding: 10,
    },
  });
};
