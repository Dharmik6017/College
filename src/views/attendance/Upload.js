import React, {Component} from 'react';
import {StyleSheet, Text, View, Modal, Dimensions, Image} from 'react-native';
import AppImages from '../../theme/AppImages';

const {height} = Dimensions.get('screen');
const deviceWidth = Dimensions.get('window').width;
const Upload = props => {
  return (
    <View style={styles.previewIcon}>
      <Image source={AppImages.userIcon} style={styles.imagePreviewStyle} />
      <View style={styles.imageCancelButton}>
        <Image style={{height: 25, width: 25}} source={AppImages.editIcon} />
      </View>
    </View>
  );
};

export default Upload;

const styles = StyleSheet.create({
  previewIcon: {
    padding: 5,
  },

  imagePreviewStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    // alignSelf: 'center',
  },
  imageCancelButton: {
    alignItems: 'flex-end',
    marginTop: '20%',
    marginLeft: '12%',
    position: 'absolute',
  },
});

// https://snack.expo.io/@kristijanpetr/multiple-gallery-picker
