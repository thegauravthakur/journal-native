import { StyleSheet } from 'react-native';

export default () => {
  return StyleSheet.create({
    singleImage: {
      marginTop: 20,
      borderRadius: 15,
    },
    singleImgContainer: {
      flex: 1,
      alignItems: 'center',
    },
    twoImageOuterWrapper: {
      flexDirection: 'row',
      marginTop: 20,
    },
    FourImageOuterWrapper: { flexDirection: 'row' },
    twoImageWrapper: { maxWidth: '50%' },
  });
};
