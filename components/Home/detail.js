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
          onLoadEnd={this.htmlLoaded.bind(this)}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
  htmlLoaded() {
    console.log(33);
    this.setState({
      loaded: false
    });
  }
  componentDidMount() {
    console.log(22);
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
  indicator: {}
});
{
  /**/
}
module.exports = DetailsScreen;
