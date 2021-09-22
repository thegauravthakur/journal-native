import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';
import Ripple from 'react-native-material-ripple';
import { checkAndRequestPermission } from '../services/permissions';
import { useRecoilValue } from 'recoil';
import { themeState } from '../recoil/atom';
import colorScheme from '../constants/colorScheme';

export const PermissionModal = ({
  showPermissionModal,
  setShowPermissionModal,
}) => {
  const theme = useRecoilValue(themeState);
  return (
    <Modal isVisible={showPermissionModal}>
      <View
        style={{
          backgroundColor: colorScheme[theme].card,
          paddingVertical: 25,
          paddingHorizontal: 15,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            paddingBottom: 10,
            color: '#1E40AF',
          }}>
          Permission Required!
        </Text>
        <Text
          style={{
            color: colorScheme[theme].subText,
            lineHeight: 20,
            fontSize: 15,
          }}>
          To use local images, you need to grant permission to read the external
          storage.
        </Text>
        <Text
          style={{
            color: colorScheme[theme].subText,
            lineHeight: 20,
            fontSize: 15,
            marginTop: 10,
          }}>
          We upload none of your data to any server. We store everything safely
          on the device itself 😊.
        </Text>
        <Ripple
          onPress={async () => {
            const result = await checkAndRequestPermission();
            if (result) setShowPermissionModal(false);
          }}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderWidth: 1,
            alignSelf: 'flex-start',
            borderRadius: 5,
            marginTop: 20,
            borderColor: '#1E40AF',
          }}>
          <Text
            style={{
              color: colorScheme[theme].text,
            }}>
            Give Permission
          </Text>
        </Ripple>
      </View>
    </Modal>
  );
};
