import { Linking, Text, View } from 'react-native';
import React from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
const pkg = require('../../package.json');
import InfoViewListTile from '../components/InfoViewListTile';
import { useRecoilValue } from 'recoil';
import { themeState } from '../recoil/atom';
import colorScheme from '../constants/colorScheme';

const InfoView = () => {
  const theme = useRecoilValue(themeState);
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <EntypoIcon
          color={colorScheme[theme].primary}
          size={50}
          name={'book'}
        />
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              color: colorScheme[theme].text,
            }}>
            Indexing Life
          </Text>
          <Text style={{ fontSize: 13, color: colorScheme[theme].subText }}>
            Version {pkg.version}
          </Text>
        </View>
      </View>
      <InfoViewListTile
        icon={'comment-multiple'}
        subText={'Help me improve the app by adding a quick review'}
        title={'Rate me!'}
        onPress={async () => {
          await Linking.openURL(
            'https://play.google.com/store/apps/details?id=com.gauravthakur.indexinglife',
          );
        }}
      />
      <InfoViewListTile
        icon={'email'}
        subText={
          'Do you have any suggestion or feature that you want in this app.'
        }
        title={'Send feedback!'}
        onPress={() =>
          Linking.openURL(
            'mailto:gthakur581@gmail.com?subject=Feedback for Journal App',
          )
        }
      />
      <InfoViewListTile
        icon={'bug'}
        subText={'Are you facing any bug in the application?'}
        title={'Report a bug'}
        onPress={() =>
          Linking.openURL(
            'mailto:gthakur581@gmail.com?subject=Bug report for journal app',
          )
        }
      />
      <InfoViewListTile
        icon={'twitter'}
        subText={'Twitter is the fastest way to contact me!'}
        title={'Follow me'}
        onPress={() => {
          Linking.openURL('twitter://user?screen_name=gauravcodes').catch(
            async () => {
              await Linking.openURL('https://www.twitter.com/gauravcodes');
            },
          );
        }}
      />
    </View>
  );
};

export default InfoView;
