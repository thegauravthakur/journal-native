import { Text, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import Ripple from 'react-native-material-ripple';

const InfoViewListTile = ({ title, subText, icon }) => {
  return (
    <Ripple>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <MaterialIcon color={'#3B82F6'} size={30} name={icon} />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#4F46E5' }}>
            {title}
          </Text>
          <Text style={{ fontSize: 13, color: '#6B7280' }}>{subText}</Text>
        </View>
      </View>
    </Ripple>
  );
};

export default InfoViewListTile;
