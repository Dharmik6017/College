import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';

const CardView = props => {
  const {onPress} = props;

  return <View style={props.cardContainer}>{props.children}</View>;
};

CardView.propTypes = {};

export default CardView;
