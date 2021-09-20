import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const pkg = require('../../package.json');

const InfoView = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <EntypoIcon size={50} name={'book'} />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
            Everyday Journal
          </Text>
          <Text style={{ fontSize: 13 }}>Version {pkg.version}</Text>
        </View>
      </View>

      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          <MaterialIcon size={30} name={'comment-multiple'} />
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Rate me!</Text>
            <Text style={{ fontSize: 13 }}>
              Help me improve the app by adding a quick review
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <MaterialIcon size={30} name={'email'} />
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
            Send feedback!
          </Text>
          <Text style={{ fontSize: 13 }}>
            Do you have any suggestion or feature that you want in this app.
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <MaterialIcon size={30} name={'bug'} />
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Report a bug</Text>
          <Text style={{ fontSize: 13 }}>
            Are you facing any bug in the application?
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <MaterialIcon size={30} name={'twitter'} />
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Follow me</Text>
          <Text style={{ fontSize: 13 }}>
            Twitter is the fastest way to contact me!
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InfoView;
