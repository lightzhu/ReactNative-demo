/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from './components/Home/home';
import Movie from './components/Movie/movie';
import Mine from './components/mine';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import BaseComponent from 'rmc-input-number/lib/base';

const deviceWidth = Dimensions.get('window').width;
const basePx = 375

function px2dp(px) {
  return px *  deviceWidth / basePx
}
const instructions = Platform.select({
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends BaseComponent {
  state= {
    selectedTab: 'home',
    badge_text:'5'
  };
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="主页"
            renderIcon={() => <Icon name="home" size={px2dp(22)} color="#666"/>}
            renderSelectedIcon={() => <Icon name="home" size={px2dp(22)} color="#3496f0"/>}
            onPress={() => this.setState({ selectedTab: 'home' })}>
            <Home></Home>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'movie'}
            title="电影"
            renderIcon={() => <Icon name="laptop" size={px2dp(22)} color="#666"/>}
            renderSelectedIcon={() => <Icon name="laptop" size={px2dp(22)} color="#3496f0"/>}
            onPress={() => this.setState({ selectedTab: 'movie' })}>
            {/*<Text style={styles.welcome}>电影列表</Text>*/}
            <Movie></Movie>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'mine'}
            title="我的"
            renderIcon={() => <Icon name="user" size={px2dp(22)} color="#666"/>}
            renderSelectedIcon={() => <Icon name="user" size={px2dp(22)} color="#3496f0"/>}
            badgeText={this.state.badge_text}
            onPress={() => this.setState({ selectedTab: 'mine' })}>
            <Mine></Mine>
          </TabNavigator.Item>
        </TabNavigator>
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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  may:{
    flex: 1,
    justifyContent: "space-evenly",
    padding: 10
  }
});
