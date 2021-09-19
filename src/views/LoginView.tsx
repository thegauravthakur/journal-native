import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SocialButton from '../components/SocialButton';

export function LoginView() {
  const [loading, setLoading] = useState(false);
  const onGoogleButtonPress = async () => {
    setLoading(true);
    // GoogleSignin.configure({
    //   webClientId:
    //     '769834226123-c3orkkjrb502ko9qjgpe2700f6g71r9v.apps.googleusercontent.com',
    // });
    // const { idToken } = await GoogleSignin.signIn();
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // return auth().signInWithCredential(googleCredential);
  };
  return (
    <View style={Style.wrapper}>
      <View style={Style.textWrapper}>
        <Text style={Style.header}>Welcome Back</Text>
        <Text style={Style.subHeading}>
          Just a minute away from experiencing clean UI experience
        </Text>
      </View>
      <SocialButton
        loading={loading}
        buttonTitle={'Login with Google'}
        btnType='google'
        color='#de4d41'
        backgroundColor='#f5e7ea'
        onPress={() => {
          onGoogleButtonPress().then(() => setLoading(false));
        }}
      />
    </View>
  );
}

const Style = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  header: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 17,
    textAlign: 'center',
  },
  textWrapper: {
    marginBottom: 70,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  spinner: {
    position: 'absolute',
    left: 10,
    top: '50%',
  },
});
