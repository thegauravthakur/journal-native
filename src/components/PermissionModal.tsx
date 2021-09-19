import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';
import Ripple from 'react-native-material-ripple';
import { check, openSettings, PERMISSIONS } from 'react-native-permissions';
import { checkAndRequestPermission } from '../services/permissions';

export const PermissionModal = ({
  showPermissionModal,
  setShowPermissionModal,
}) => {
  return (
    <Modal isVisible={showPermissionModal}>
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 25,
          paddingHorizontal: 15,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            paddingBottom: 10,
          }}>
          Permission Required!
        </Text>
        <Text>
          Inorder to use images, you need to give read permission to the
          application. This will give us enough rights to show your images
        </Text>
        <Ripple
          onPress={() => {
            check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(
              async result => {
                if (result === 'denied') {
                  const granted = await checkAndRequestPermission();
                  if (granted) setShowPermissionModal(false);
                } else if (result === 'blocked') await openSettings();
                else if (result === 'granted') setShowPermissionModal(false);
              },
            );
          }}
          style={{
            paddingVertical: 9,
            paddingHorizontal: 10,
            borderWidth: 1,
            alignSelf: 'flex-start',
            borderRadius: 5,
            marginTop: 20,
          }}>
          <Text>Give Permission</Text>
        </Ripple>
      </View>
    </Modal>
  );
};
