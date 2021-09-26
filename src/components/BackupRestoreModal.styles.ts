import { StyleSheet } from 'react-native';
import colorScheme from '../constants/colorScheme';

export default theme => {
  return StyleSheet.create({
    RestoreText: {
      textAlign: 'center',
      backgroundColor: '#2563EB',
      color: '#FFFFFF',
      paddingVertical: 8,
      marginBottom: 10,
      borderRadius: 10,
    },
    BackupText: {
      textAlign: 'center',
      backgroundColor: '#10B981',
      color: '#FFFFFF',
      paddingVertical: 8,
      marginBottom: 10,
      borderRadius: 10,
    },
    ErrorMessage: {
      borderWidth: 1,
      borderColor: colorScheme[theme].subText,
      color: colorScheme[theme].subText,
      paddingVertical: 2,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    Title: {
      fontSize: 17,
      paddingBottom: 5,
      fontWeight: 'bold',
      color: colorScheme[theme].text,
    },
    SubText: {
      fontSize: 14,
      paddingBottom: 20,
      color: colorScheme[theme].subText,
    },
    Wrapper: {
      backgroundColor: colorScheme[theme].card,
      paddingVertical: 30,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    ErrorMessageText: {
      paddingBottom: 10,
      color: colorScheme[theme].errorColor,
    },
    Message: { color: '#6B7280' },
    SubHeading: { fontWeight: 'bold' },
  });
};
