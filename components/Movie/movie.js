import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const basePx = 375

function px2dp(px) {
  return px *  deviceWidth / basePx
}
export default class movie extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>这是列表页</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
