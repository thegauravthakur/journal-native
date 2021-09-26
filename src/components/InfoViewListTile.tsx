import { Text, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import Ripple from 'react-native-material-ripple';
import { useRecoilValue } from 'recoil';
import { themeState } from '../recoil/atom';
import colorScheme from '../constants/colorScheme';

const InfoViewListTile = ({ title, subText, icon, onPress }) => {
  const theme = useRecoilValue(themeState);
  return (
    <Ripple onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <MaterialIcon
          color={colorScheme[theme].primary}
          size={30}
          name={icon}
        />
        <View style={{ flex: 1, marginLeft: 20 }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              flexShrink: 1,
              color: colorScheme[theme].text,
            }}>
            {title}
          </Text>
          <Text style={{ fontSize: 13, color: colorScheme[theme].subText }}>
            {subText}
          </Text>
        </View>
      </View>
    </Ripple>
  );
};

export default InfoViewListTile;
