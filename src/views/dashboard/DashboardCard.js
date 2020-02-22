import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import AppColor from '../../theme/AppColors';
import CardView from '../../common/CardView';

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 0.5,
    borderRadius: 3,
    borderColor: '#efefef',
    margin: 3,
    // borderBottomColor: '#efefef',
    // borderBottomWidth: 0.5,
    // shadowColor: '#efefef',

    elevation: 3,
    color: '#fff',
    padding: 10,
  },
  txtValue: {padding: 10, color: AppColor.color22, fontSize: 16},
});

const DashboardCard = props => {
  const {item, onPress} = props;

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              'https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_960_720.jpg',
          }}
          style={{height: 200, width: '100%'}}
        />
      </View>
      <Text style={styles.txtValue}>{item.item.value}</Text>
    </TouchableOpacity>
  );
};

export default DashboardCard;
