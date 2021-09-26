import { StyleSheet } from 'react-native';
import colorScheme from '../constants/colorScheme';

export default theme => {
  return StyleSheet.create({
    image: {
      marginVertical: 20,
      borderRadius: 15,
      overlayColor: colorScheme[theme].overlayColor,
    },
    imgContainer: {
      flex: 1,
      alignItems: 'center',
    },
    closeIcon: {
      position: 'absolute',
      top: 40,
      right: 40,
      backgroundColor: '#172234',
      color: 'white',
      borderRadius: 25,
      padding: 2,
    },
  });
};
