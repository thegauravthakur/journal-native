import React from 'react';
import { Button, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import Realm from 'realm';
import { EventSchema, ImageSchema } from '../db/EventSchema';

function ModalTester({ isModalVisible, setModalVisible }) {
  const realm = new Realm({
    path: 'myrealm2.realm',
    schema: [EventSchema, ImageSchema],
  });

  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      onBackdropPress={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
      isVisible={isModalVisible}>
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}>
        <Text style={{ fontSize: 17, paddingBottom: 20 }}>
          Backup / Restore
        </Text>
        <Button
          title={'Backup'}
          onPress={() => {
            Share.open({
              title: 'backup db',
              url: 'file://' + realm.path,
            })
              .then(() => {
                setModalVisible(false);
              })
              .catch(() => {
                setModalVisible(false);
              });
          }}
        />
      </View>
    </Modal>
  );
}

export default ModalTester;
