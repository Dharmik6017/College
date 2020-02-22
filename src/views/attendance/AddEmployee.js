import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Alert,
  ScrollView,
  Picker,
} from 'react-native';
import Upload from './Upload';
import Input from '../../common/TextInput';
import AppColors from '../../theme/AppColors';

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    padding: 10,
  },
  cardContainer: {
    width: '48%',
    margin: 3,
  },

  uploadView: {
    height: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    padding: 10,
  },
  inputView: {
    fontSize: 16,
    color: AppColors.color22,
    paddingBottom: 5,
  },
  containerStyle: {
    borderBottomColor: '#efefef',
    height: 30,
  },
  lineView: {
    borderColor: AppColors.grayView,
    borderWidth: 2,
    width: '95%',

    marginLeft: 10,
  },
  bgPicker: {marginLeft: 10},
  uploadBottomView: {
    height: 100,
    width: '90%',
    margin: 20,
    backgroundColor: 'gray',
    // marginTop: 10,
  },
});

const AddEmployee = props => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [designation, setDesignation] = useState('');
  const [empType, setEmpType] = useState('');
  const [contactNo, setContactNo] = useState('');

  const [bloodGroup, setBloodGroup] = useState('');
  const [dob, setDob] = useState('');
  const [idPhoto, setIdPhoto] = useState('');
  //   const phonePad = 'phone-pad';
  //   const bloodGroup = () => {
  //     return (
  //       BloodGroup &&
  //       BloodGroup.map((u, i) => {
  //         return <Picker.Item key={i} label={u.label} value={u.value} />;
  //       })
  //     );
  //   };
  //   const selectBloodGroup = title => {
  //     this.setState({
  //       blood_group: title,
  //       update: false,
  //     });
  //   };
  return (
    <ScrollView>
      <View>
        <View style={styles.uploadView}>
          <Upload />
        </View>
        <View style={styles.innerContainer}>
          <Input
            placeholder="Name"
            inputContainerStyle={styles.containerStyle}
            inputStyle={styles.inputView}
            value={name}
            onChangeText={text =>
              this.setState({first_name: text, update: false})
            }
            maxLength={15}
            // returnKeyType="next"
            // onSubmitEditing={() => {
            //   this.genderTextInput.focus();
            // }}
            blurOnSubmit={false}
          />
          <Input
            placeholder="Gender"
            inputContainerStyle={styles.containerStyle}
            inputStyle={styles.inputView}
            onChangeText={text =>
              this.setState({last_name: text, update: false})
            }
            value={gender}
            maxLength={15}
            returnKeyType="next"
            // setRef={input => {
            //   this.genderTextInput = input;
            // }}
            // onSubmitEditing={() => {
            //   this.designationTextInput.focus();
            // }}
          />
          <Input
            placeholder="Designation"
            inputContainerStyle={styles.containerStyle}
            inputStyle={styles.inputView}
            onChangeText={text =>
              this.setState({contact_number: text, update: false})
            }
            value={designation}
            returnKeyType="next"
            // keyboardType={phonePad}
            maxLength={10}
          />
          <Input
            placeholder="Employee Type"
            inputContainerStyle={styles.containerStyle}
            inputStyle={styles.inputView}
            onChangeText={text =>
              this.setState({contact_number: text, update: false})
            }
            value={empType}
            returnKeyType="next"
            // keyboardType={phonePad}
            maxLength={10}
          />
          <Input
            placeholder="Contact No"
            inputContainerStyle={styles.containerStyle}
            inputStyle={styles.inputView}
            onChangeText={text =>
              this.setState({contact_number: text, update: false})
            }
            value={contactNo}
            returnKeyType="next"
            // keyboardType={phonePad}
            maxLength={10}
          />
          <Input
            placeholder="DOB"
            inputContainerStyle={styles.containerStyle}
            inputStyle={styles.inputView}
            onChangeText={text =>
              this.setState({contact_number: text, update: false})
            }
            value={dob}
            returnKeyType="next"
            // keyboardType={phonePad}
            maxLength={10}
          />
          <Picker
            // onValueChange={selectBloodGroup}
            style={styles.bgPicker}
            selectedValue={bloodGroup}>
            {/* {bloodGroup()} */}
          </Picker>
          <View style={styles.lineView} />
          <View style={styles.uploadBottomView}>
            {/* <Upload
            //   multiple={false}
            //   folder="/issues"
            //   name="ticket"
            //   onChange={setIdPhoto}
            //   showText="Upload Image"
            /> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddEmployee;
