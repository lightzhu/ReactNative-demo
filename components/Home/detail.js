/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Button,
  WebView
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const basePx = 375;

function px2dp(px) {
  return (px * deviceWidth) / basePx;
}

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: "新闻详情"
  };
  constructor(props) {
    super(props);
    this.state = {
      loaded: true
    };
  }
  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    //const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam("otherParam", "some default value");
    console.log(otherParam);
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.indicator}>
          <ActivityIndicator
            size="large"
            color="#0000ff"
            animating={this.state.loaded}
          />
        </View>
        <WebView
          originWhitelist={["*"]}
          source={{ uri: otherParam }}
          onLoadStart={this.htmlLoaded.bind(this)}
        />
      </View>
    );
  }
  htmlLoaded() {
    var that = this;
    setTimeout(function(){
      that.setState({
        loaded: false
      });
    },3000)
  }
  componentDidMount() {
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    position:'absolute',
    zIndex:1000,
    top:0,
    right:0,
    bottom:0,
    left:0,
  }
});
{
  /**/
}
module.exports = DetailsScreen;
