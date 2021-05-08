import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
const SocialButton = ({
  loading,
  buttonTitle,
  btnType,
  color,
  backgroundColor,
  ...rest
}) => {
  let bgColor = backgroundColor;
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { backgroundColor: bgColor }]}
      {...rest}>
      <View style={styles.iconWrapper}>
        {!loading ? (
          <FontAwesome
            name={btnType}
            style={styles.icon}
            size={20}
            color={color}
          />
        ) : (
          <ActivityIndicator color={color} />
        )}
      </View>
      <View style={styles.btnTxtWrapper}>
        <Text style={[styles.buttonText, { color: color }]}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 3,
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular',
  },
});
