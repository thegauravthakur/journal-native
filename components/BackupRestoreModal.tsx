import React, { useState } from 'react';
import {
  Button,
  NativeModules,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import Realm from 'realm';
import { EventSchema, ImageSchema } from '../db/EventSchema';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

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
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 17,
            paddingBottom: 5,
            fontWeight: 'bold',
            color: '#374151',
          }}>
          Backup Restore Hub
        </Text>
        <Text style={{ fontSize: 14, paddingBottom: 20, color: '#4B5563' }}>
          Backup and restore your database
        </Text>
        <TouchableOpacity
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
          style={{}}>
          <Text
            style={{
              textAlign: 'center',
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              paddingVertical: 8,
              marginBottom: 10,
              borderRadius: 10,
            }}>
            BackUp
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            DocumentPicker.pickSingle().then(r => {
              RNFS.copyFile(r.uri, RNFS.DocumentDirectoryPath + '/' + r.name)
                .then(() => {
                  NativeModules.DevSettings.reload();
                })
                .catch(e => console.log(e));
            });
          }}
          style={{}}>
          <Text
            style={{
              textAlign: 'center',
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              paddingVertical: 8,
              marginBottom: 10,
              borderRadius: 10,
            }}>
            Restore
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default ModalTester;
