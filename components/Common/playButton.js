import React, { Component } from "react";
import {StyleSheet, Text, View,TouchableOpacity, Image } from "react-native";
import { Dimensions } from "react-native";

import Icon from 'react-native-vector-icons/AntDesign';
const deviceWidth = Dimensions.get("window").width;
const basePx = 375;

function px2dp(px) {
  return (px * deviceWidth) / basePx;
}

class PlayButton extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  componentWillMount(){
    console.log(this.props);
  }
  render() {
    return (
      <View style={styles.slide}>
        <Icon name="playcircleo" size={px2dp(45)} color="#fff"/>
      </View>
    );
  }
  _onPress = (url) => {
    console.log(url);
    // this.props.navigation.navigate('Details', {
    //   otherParam: url,
    // });
  }
  componentDidMount() {
    console.log(this.props);
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex:10,
  },
});

module.exports = PlayButton;
