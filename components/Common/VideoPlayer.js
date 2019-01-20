import React, { Component } from "react";
import { Platform, StyleSheet, Text, View,TouchableOpacity, Image } from "react-native";
import { Dimensions } from "react-native";
//import Video from 'react-native-video'

const deviceWidth = Dimensions.get("window").width;
class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'stretch',
      duration: 0.0,
      currentTime: 0.0,
      paused: false,
    };
  }
  componentWillMount(){
    console.log(this.props);
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <Video
          source={{ uri: 'http://localhost:3000/test.m3u8' }}
          style={styles.videoNormalFrame}
          rate={this.state.rate}
          paused={this.state.paused}
          volume={this.state.volume}
          muted={this.state.muted}
          resizeMode={this.state.resizeMode}
          onEnd={() => { AlertIOS.alert('Done!') }}
          repeat={true}
        /> */}
      </View>
    );
  }
  _onPress = (url) => {
    console.log(url);
  }
  componentDidMount() {
    console.log(this.props.dataList);
  }
}

var NORMAL_WIDTH = deviceWidth;
var NORMAL_HEIGHT = NORMAL_WIDTH*2/3;
// var FULL_WIDTH = sr.h;
// var FULL_HEIGHT = sr.w;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    videoNormalFrame: {
        position: 'absolute',
        top:0,
        left: 0,
        width: NORMAL_WIDTH,
        height: NORMAL_HEIGHT,
    },
});
module.exports = VideoPlayer;
