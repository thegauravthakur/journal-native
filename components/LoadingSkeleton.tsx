import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Dimensions, View } from 'react-native';
import React from 'react';

export function LoadingSkeleton() {
  return (
    <View>
      <SkeletonPlaceholder>
        <View
          style={{
            width: 150,
            marginBottom: 20,
            height: 50,
            marginLeft: 10,
            marginTop: 25,
          }}
        />
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              width: 30,
              height: 30,
              marginLeft: 10,
              borderRadius: 50,
              marginTop: 10,
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <View
              style={{
                width: Dimensions.get('screen').width - 80,
                height: 40,
                borderRadius: 4,
                marginTop: 10,
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 50 }}>
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
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
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
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
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
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
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
      </SkeletonPlaceholder>
    </View>
  );
}
