import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Button,
  Text,
  Icon,
  TextInput,
  BackHandler,
} from 'react-native';
// import {Button, Text, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginUser} from '../../actions/authAction';
// import Login from '../../images/login.png';
// import Image1 from '../../images/sli1.png';
// import Image2 from '../../images/sli2.png';
// import Image3 from '../../images/sli3.png';
// import AppColors from '../../theme/AppColors';
// import TextInput from '../../common/FormElements/textInput';
// import LoginSlider from './loginSlider';
import LoginSVG from '../../svgs/loginSvg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },

  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  },

  btnLogin: {
    // backgroundColor: AppColors.drawerColor,
    borderRadius: 4,
    padding: 5,
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtLogin: {
    // color: AppColors.white,
    fontSize: 16,
  },
  txtForgotPass: {
    alignSelf: 'flex-end',
    color: '#222',
    margin: 5,
    padding: 5,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
  },
  innercontainer: {
    margin: 5,
  },
  btnView: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
  },
  inputView: {
    fontSize: 18,
    paddingBottom: 5,
    // color: AppColors.tabColor,
  },
  containerStyle: {borderBottomColor: '#efefef', height: 30},

  txtSkip: {
    fontSize: 14,
    padding: 10,
    color: 'red',
  },
  forget: {alignItems: 'flex-end'},
  signUp: {fontWeight: 'bold'},
  loginButton: {
    paddingTop: 60,
  },
  disabledButton: {backgroundColor: 'lightgray'},
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showRealApp: false,
      isLoading: false,
      isChangePassword: '',
    };
  }

  componentWillUnmount() {}

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps && nextProps.errors !== prevState.errors) {
      return {
        errors: nextProps.errors,
        loading: nextProps.loading,
      };
    }
    if (nextProps.loading !== prevState.loading) {
      return {loading: nextProps.loading};
    }

    if (prevState.auth !== nextProps.auth && nextProps.auth.isAuthenticated) {
      nextProps.setVisible && nextProps.setVisible(false);
    }

    return {};
  }

  // handleBackPress = () => {
  //   // this.props.navigation.goBack(); // works best when the goBack is async
  //   // this.props.navigation.dispatch(NavigationActions.back());
  //   this.props.navigation.navigate('Home');

  //   return true;
  // };

  // handleOnDone = () => {
  //   this.props.navigation.navigate('Home');
  //   // this.setState({showRealApp: true});
  // };

  login = () => {
    const {email, password} = this.state;
    this.setState({isLoading: true}, () => {
      const payload = {email, password};
      this.props.loginUser(payload, '', this.props.navigation);
    });
  };

  // navigate to reset screen
  // onClickForgot = () => {
  //   const {email} = this.state;
  //   this.props.navigation.navigate('Reset', {EMAIL: email});
  // };

  // onSignin = () => {
  //   this.props.navigation.navigate('Signin');
  // };

  // onClickSkipExplore = () => {
  //   this.props.navigation.navigate('Home');
  // };
  onChangeState = (name, value) => {
    this.setState({[name]: value});
  };
  static navigationOptions = {
    header: 'none',
  };
  render() {
    const {email, password, showRealApp, loading, errors} = this.state;

    return (
      <KeyboardAvoidingView behavior="position" enabled>
        <View style={styles.header}>
          {/* <Image source={Login} /> */}
          <LoginSVG />
        </View>

        <View style={styles.innercontainer}>
          <TextInput
            inputContainerStyle={styles.containerStyle}
            placeholder="Email"
            onChangeText={text => this.onChangeState('email', text)}
            // value={email}
            inputStyle={styles.inputView}
            maxLength={100}
            returnKeyType="next"
            blurOnSubmit={false}
            errorMessage={errors && errors.fields && errors.fields.email}
          />
          <TextInput
            inputContainerStyle={styles.containerStyle}
            inputStyle={styles.inputView}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => this.onChangeState('password', text)}
            // onSubmitEditing={this.login}
            // errorMessage={errors && errors.fields && errors.fields.password}
          />

          <TouchableOpacity
            // onPress={() => this.onClickForgot()}
            style={styles.forget}>
            <Text style={styles.txtForgotPass}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.btnView}>
            <Button
              title="Login"
              // onPress={this.login}
              disabled={
                !!(!email || !email.trim() || !password || !password.trim())
              }
              disabledStyle={styles.disabledButton}
              // loading={loading}
              containerStyle={styles.loginButton}
              icon={
                <Icon
                  name="arrow-right"
                  size={20}
                  type="material-community"
                  color={!email || !password ? 'grey' : 'white'}
                />
              }
              iconRight
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
  // return (
  //   <LoginSlider
  //     setShowRealApp={val => {
  //       this.setState({showRealApp: val});
  //     }}
  //     navigation={this.props.navigation}
  //   />
  // );
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.auth.user && state.auth.user.errors,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginUser,
    },
    dispatch,
  );

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
