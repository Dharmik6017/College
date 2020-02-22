import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Alert, View, Text, Button} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'background-color: rgba(80,80,80, 0.9)',
  },
  innerContainer: {
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    padding: 10,
    // opacity: 1,
  },
});

const ModalView = props => {
  let {dialog, setDialog} = props;
  // const [dialog, setDialog] = useState(props.dialog);

  // useEffect(() => {
  //   console.log('props.dialog changed', props.dialog);
  //   setDialog(props.dialog);
  // }, [props.dialog]);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={dialog}
      onRequestClose={() => {
        setDialog(false);
      }}>
      <View style={styles.mainContainer}>
        <View style={styles.innerContainer}>
          {props.children}
          <View>
            <Button
              title="Close"
              onPress={() => {
                setDialog(false);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default ModalView;
