import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import { Dimensions } from 'react-native';
import { Tabs  } from 'antd-mobile-rn';
import MovieList from '../Common/movieList';
import ComingSoon from '../Common/comingSoon';
import movieData from "../Movie/list";
const deviceWidth = Dimensions.get('window').width;
const basePx = 375

function px2dp(px) {
  return px *  deviceWidth / basePx
}
export default class movie extends Component {
  constructor(props){
    super(props);
    this.state = {
      in_theaters:movieData.in_theaters,
      coming_soon:movieData.coming_soon,
    };
  }
  render() {
    const tabs = [
      { title: '正在热映' },
      { title: '即将上映' },
      { title: '热门下载' },
    ];
    return (
      <View style={styles.container}>
        {/**<Text style={styles.welcome}>这是列dd表页</Text>*/}
        <View style={{ flex: 1 }}>
          <Tabs tabs={tabs}>
            <View style={styles.tabItem}>
              <MovieList list={this.state.in_theaters} />
            </View>
            <View style={styles.tabItem}>
              <ComingSoon list={this.state.coming_soon} />
            </View>
            <View style={styles.tabItem}>
              <Text>Content of Third Tab</Text>
            </View>
          </Tabs>
        </View>
      </View>
    );
  }
  toMovieDetail = (url) => {
    console.log(url);
    // this.props.navigation.navigate("Details", {
    //   otherParam: url
    // });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  head:{
    paddingLeft:20,
    paddingRight:20,
    paddingTop:10,
  },
  tabItem:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
