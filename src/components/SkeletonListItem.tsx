import { Dimensions, View } from 'react-native';
import React from 'react';

export function SkeletonListItem({ marginTop }) {
  return (
    <View style={{ flexDirection: 'row', marginTop }}>
      <View
        style={{ width: 30, height: 30, marginLeft: 10, borderRadius: 50 }}
      />
      <View style={{ marginLeft: 10 }}>
        <View
          style={{ marginTop: 6, width: 50, height: 20, borderRadius: 4 }}
        />
        <View
          style={{
            width: Dimensions.get('screen').width - 80,
            height: 20,
            borderRadius: 4,
            marginTop: 10,
          }}
        />
        <View
          style={{
            width: Dimensions.get('screen').width - 80,
            height: 20,
            borderRadius: 4,
            marginTop: 10,
          }}
        />
        <View
          style={{
            width: Dimensions.get('screen').width - 80,
            height: 20,
            borderRadius: 4,
            marginTop: 10,
          }}
        />
        <View
          style={{
            width: Dimensions.get('screen').width - 80,
            height: 20,
            borderRadius: 4,
            marginTop: 10,
          }}
        />
      </View>
    </View>
  );
}
