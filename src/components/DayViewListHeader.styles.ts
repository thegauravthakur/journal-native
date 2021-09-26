import { StyleSheet } from 'react-native';
import colorScheme from '../constants/colorScheme';

export default theme => {
  return StyleSheet.create({
    selectedDate: {
      fontSize: 29,
      marginLeft: 12,
      marginBottom: 30,
      color: colorScheme[theme].text,
    },
    container: {
      paddingTop: 10,
      marginLeft: 20,
      paddingLeft: 25,
      paddingBottom: 30,
      borderLeftWidth: 2,
      borderColor: colorScheme[theme].borderEvent,
    },
    icon: {
      borderRadius: 100,
      padding: 8,
      backgroundColor: colorScheme[theme].icon,
    },
    ripple: {
      position: 'absolute',
      left: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
      borderRadius: 100,
    },
  });
};
