import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { useSetRecoilState } from 'recoil';
import { spinnerState } from '../recoil/atom';
import { zipWithPassword, unzipWithPassword } from 'react-native-zip-archive';
import Share from 'react-native-share';
import getRealm from '../services/realm';
import RNRestart from 'react-native-restart';

function ModalTester({ isModalVisible, setModalVisible }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const setSpinner = useSetRecoilState(spinnerState);

  return (
    <Modal
      onLayout={() => {
        setErrorMessage('');
        setPassword('');
      }}
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
        <TextInput
          onChangeText={text => setPassword(text)}
          value={password}
          placeholder={'Enter password'}
          style={{
            borderWidth: 1,
            padding: 0,
            marginBottom: errorMessage === '' ? 10 : 5,
            paddingVertical: 2,
            paddingHorizontal: 4,
            borderRadius: 5,
          }}
        />
        {errorMessage !== '' && (
          <Text style={{ paddingBottom: 10, color: '#EF4444' }}>
            {errorMessage}
          </Text>
        )}
        <TouchableOpacity
          onPress={async () => {
            try {
              const realm = await getRealm();
              if (password.length < 4) {
                setErrorMessage(
                  'Password length should be greater than 4 characters',
                );
                return;
              } else setErrorMessage('');

              setSpinner({ visible: true, textContent: '' });
              const isExists = await RNFS.exists(
                RNFS.DocumentDirectoryPath + '/backup',
              );
              if (!isExists)
                await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/backup');
              await RNFS.copyFile(
                realm.path,
                RNFS.DocumentDirectoryPath + '/backup/myrealm2.realm',
              );
              console.log('copy file done!');
              const path = await zipWithPassword(
                RNFS.DocumentDirectoryPath + '/backup',
                RNFS.DocumentDirectoryPath + '/backupSuper.zip',
                password,
              );
              console.log('zip done successfully!');
              setSpinner({ visible: false, textContent: '' });
              Share.open({
                title: 'backup models',
                url: 'file://' + path,
              })
                .then(() => {
                  setModalVisible(false);
                })
                .catch(() => {
                  setModalVisible(false);
                });
            } catch (e) {
              console.log('error occurred while created zip ', e);
            }
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
          onPress={async () => {
            try {
              if (password.length < 4) {
                setErrorMessage(
                  'Password length should be greater than 4 characters',
                );
                return;
              } else setErrorMessage('');

              const { uri } = await DocumentPicker.pickSingle();
              setSpinner({ visible: true, textContent: '' });
              await RNFS.copyFile(
                uri,
                RNFS.DocumentDirectoryPath + '/superRestore.zip',
              );
              console.log('copy done!');
              await unzipWithPassword(
                RNFS.DocumentDirectoryPath + '/' + 'superRestore.zip',
                RNFS.DocumentDirectoryPath,
                password,
              );
              setSpinner({ visible: true, textContent: '' });
              RNRestart.Restart();
            } catch (e) {
              console.log('Error occurred while restoring', e);
            }
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
        <Text style={{ color: '#6B7280' }}>
          <Text style={{ fontWeight: 'bold' }}>Note</Text>: Password is required
          for both restore/backup. Use the same password for restore which you
          used during the backup process
        </Text>
      </View>
    </Modal>
  );
}

export default ModalTester;
