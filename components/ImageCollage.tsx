import {
  Dimensions,
  Image as Img,
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Image from 'react-native-scalable-image';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { format } from 'date-fns';
import ImageViewer from 'react-native-image-zoom-viewer';

export function ImageCollage({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bigImageModal, setBigImageModal] = useState(false);

  return (
    <>
      <Modal visible={bigImageModal} transparent={true}>
        <ImageViewer
          onShowModal={ctx => console.log(ctx)}
          enableSwipeDown={true}
          onSwipeDown={() => setBigImageModal(false)}
          imageUrls={images}
          onCancel={() => setBigImageModal(false)}
          index={currentIndex}
        />
      </Modal>
      <View>
        {images?.length === 1 && (
          <View style={Style.singleImgContainer}>
            <Image
              onPress={() => {
                setCurrentIndex(0);
                setBigImageModal(true);
              }}
              component={Img}
              style={Style.singleImage}
              width={Dimensions.get('window').width - 60}
              source={{ uri: images[0].url }}
              height={238}
            />
          </View>
        )}
        {images?.length === 2 && (
          <View style={Style.twoImageOuterWrapper}>
            <View style={Style.twoImageWrapper}>
              <TouchableOpacity
                onPress={() => {
                  setCurrentIndex(0);
                  setBigImageModal(true);
                }}>
                <Img
                  style={{
                    width: '100%',
                    height: undefined,
                    aspectRatio: 1,
                    borderTopLeftRadius: 15,
                    borderBottomLeftRadius: 15,
                  }}
                  source={{ uri: images[0].url }}
                />
              </TouchableOpacity>
            </View>
            <View style={Style.twoImageWrapper}>
              <TouchableOpacity
                onPress={() => {
                  setCurrentIndex(1);
                  setBigImageModal(true);
                }}>
                <Img
                  style={{
                    width: '100%',
                    height: undefined,
                    aspectRatio: 1,
                    borderTopRightRadius: 15,
                    borderBottomRightRadius: 15,
                    marginLeft: 1,
                  }}
                  source={{ uri: images[1].url }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {images?.length === 3 && (
          <View>
            <View style={Style.twoImageOuterWrapper}>
              <View style={Style.twoImageWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    setCurrentIndex(0);
                    setBigImageModal(true);
                  }}>
                  <Img
                    style={{
                      width: '100%',
                      height: undefined,
                      aspectRatio: 1,
                      borderTopLeftRadius: 15,
                    }}
                    source={{ uri: images[0].url }}
                  />
                </TouchableOpacity>
              </View>
              <View style={Style.twoImageWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    setCurrentIndex(1);
                    setBigImageModal(true);
                  }}>
                  <Img
                    style={{
                      width: '100%',
                      height: undefined,
                      aspectRatio: 1,
                      borderTopRightRadius: 15,
                      marginLeft: 1,
                    }}
                    source={{ uri: images[1].url }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ ...Style.FourImageOuterWrapper }}>
              <TouchableOpacity
                onPress={() => {
                  setCurrentIndex(2);
                  setBigImageModal(true);
                }}>
                <Img
                  style={{
                    width: '100%',
                    height: undefined,
                    aspectRatio: 2,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                  }}
                  source={{ uri: images[2].url }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {images?.length === 4 && (
          <View>
            <View style={Style.twoImageOuterWrapper}>
              <View style={Style.twoImageWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    setCurrentIndex(0);
                    setBigImageModal(true);
                  }}>
                  <Img
                    style={{
                      width: '100%',
                      height: undefined,
                      aspectRatio: 1,
                      borderTopLeftRadius: 15,
                    }}
                    source={{ uri: images[0].url }}
                  />
                </TouchableOpacity>
              </View>
              <View style={Style.twoImageWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    setCurrentIndex(1);
                    setBigImageModal(true);
                  }}>
                  <Img
                    style={{
                      width: '100%',
                      height: undefined,
                      aspectRatio: 1,
                      borderTopRightRadius: 15,
                      marginLeft: 1,
                    }}
                    source={{ uri: images[1].url }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ ...Style.FourImageOuterWrapper }}>
              <View style={Style.twoImageWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    setCurrentIndex(2);
                    setBigImageModal(true);
                  }}>
                  <Img
                    style={{
                      width: '100%',
                      height: undefined,
                      aspectRatio: 1,
                      borderBottomLeftRadius: 15,
                    }}
                    source={{ uri: images[2].url }}
                  />
                </TouchableOpacity>
              </View>
              <View style={Style.twoImageWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    setCurrentIndex(3);
                    setBigImageModal(true);
                  }}>
                  <Img
                    style={{
                      width: '100%',
                      height: undefined,
                      aspectRatio: 1,
                      borderBottomRightRadius: 15,
                      marginLeft: 1,
                    }}
                    source={{ uri: images[3].url }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </>
  );
}

const Style = StyleSheet.create({
  singleImage: {
    marginTop: 20,
    borderRadius: 15,
  },
  singleImgContainer: {
    flex: 1,
    alignItems: 'center',
  },
  twoImageOuterWrapper: { flexDirection: 'row', marginTop: 20 },
  FourImageOuterWrapper: { flexDirection: 'row' },
  twoImageWrapper: { maxWidth: '50%' },
});
