import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PixelRatio,
  Image,
  Dimensions,
} from 'react-native';
import {RNCamera as Camera} from 'react-native-camera';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: null,
      ImageSource: null,
      isCamera: false,
    };
  }

  takePicture = async () => {
    try {
      const data = await this.camera.takePictureAsync();
      this.setState({path: data.uri});
    } catch (err) {
      console.log('err: ', err);
    }
  };

  onYes = () => {
    const {path} = this.state;
    let source = {uri: path};
    this.setState({ImageSource: source, isCamera: false, path: null});
  };

  renderImage = () => {
    return (
      <View>
        <Image source={{uri: this.state.path}} style={styles.preview} />
        <Text style={styles.cancel} onPress={() => this.setState({path: null})}>
          Cancel
        </Text>
        <Text style={styles.yes} onPress={() => this.onYes()}>
          Yes
        </Text>
      </View>
    );
  };
  renderCamera = () => {
    return (
      <Camera
        ref={cam => {
          this.camera = cam;
        }}
        style={styles.cameraStyle}
        flashMode={Camera.Constants.FlashMode.off}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={
          'We need your permission to use your camera phone'
        }>
        <TouchableOpacity
          style={styles.cancel}
          onPress={() => this.setState({isCamera: false})}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)">
          <View />
        </TouchableOpacity>
      </Camera>
    );
  };
  openCamera = () => {
    this.setState({isCamera: true});
  };

  removeImage = () => {
    this.setState({ImageSource: null});
  };
  render() {
    const {isCamera, path} = this.state;
    return (
      <View style={styles.container}>
        {!isCamera && (
          <View style={styles.bottomConatainer}>
            <TouchableOpacity onPress={() => this.openCamera()}>
              <Text>Take photo</Text>
            </TouchableOpacity>
            <View style={styles.ImageContainer}>
              {this.state.ImageSource === null ? (
                <Text>Select a Photo</Text>
              ) : (
                <View>
                  <Image
                    style={styles.ImageContainer}
                    source={this.state.ImageSource}
                  />
                  <TouchableOpacity onPress={this.removeImage}>
                    <Text>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}

        {path ? this.renderImage() : isCamera && this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFF8E1',
  },
  bottomConatainer: {justifyContent: 'center', alignItems: 'center'},

  ImageContainer: {
    borderRadius: 10,
    width: 150,
    height: 150,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDDC39',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  cameraStyle: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
  yes: {
    position: 'absolute',
    left: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
});
