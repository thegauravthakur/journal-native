import { StyleSheet } from 'react-native';
import colorScheme from '../constants/colorScheme';

export default theme => {
  return StyleSheet.create({
    title: {
      fontWeight: 'bold',
      fontSize: 18,
      color: colorScheme[theme].primary,
    },
    description: {
      marginTop: 5,
      fontSize: 16,
      lineHeight: 25,
      fontFamily: 'segoeui',
      color: colorScheme[theme].text,
    },
    date: {
      marginTop: 10,
      color: colorScheme[theme].subText,
    },
    container: {
      marginLeft: 20,
      marginRight: 20,
      paddingLeft: 30,
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
