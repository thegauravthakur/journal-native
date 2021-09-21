import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
const pkg = require('../../package.json');
import InfoViewListTile from '../components/InfoViewListTile';

const InfoView = () => {
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <EntypoIcon color={'#3B82F6'} size={50} name={'book'} />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#4F46E5' }}>
            Everyday Journal
          </Text>
          <Text style={{ fontSize: 13, color: '#6B7280' }}>
            Version {pkg.version}
          </Text>
        </View>
      </View>
      <InfoViewListTile
        icon={'comment-multiple'}
        subText={'Help me improve the app by adding a quick review'}
        title={'Rate me!'}
      />
      <InfoViewListTile
        icon={'email'}
        subText={
          'Do you have any suggestion or feature that you want in this app.'
        }
        title={'Send feedback!'}
      />
      <InfoViewListTile
        icon={'bug'}
        subText={'Are you facing any bug in the application?'}
        title={'Report a bug'}
      />
      <InfoViewListTile
        icon={'twitter'}
        subText={'Twitter is the fastest way to contact me!'}
        title={'Follow me'}
      />
    </View>
  );
};

export default InfoView;
