import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Modal from './Modal';

const styles = StyleSheet.create({
  container: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '3.5%',
    // borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  image: {width: '100%', height: 160, borderRadius: 10},
  name: {fontSize: 16, marginTop: 5},
});

const Worker = props => {
  const {data} = props;
  const [dialog, setdialog] = useState(props.dialog);
  const onClose = () => {
    setdialog(false);
  };
  return (
    <TouchableOpacity
      key={props.eleKey}
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => {
        props.onPress(data);
      }}>
      <Image
        source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
        style={styles.image}
      />
      <Text style={styles.name}>{data.title}</Text>
    </TouchableOpacity>
  );
};

export default Worker;
