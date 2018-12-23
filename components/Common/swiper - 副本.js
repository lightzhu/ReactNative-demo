import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,Image} from 'react-native';
import { Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const deviceWidth = Dimensions.get('window').width;
const basePx = 375

function px2dp(px) {
  return px *  deviceWidth / basePx
}

class MySwiper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  render() {
    return (
       <Swiper style={styles.wrapper} showsButtons={false} autoplay={true}>
          <View style={styles.slide}>
            <Image style={styles.image} source={this.props.dataList[0].url}  />
          </View>
          <View style={styles.slide}>
             <Image style={styles.image} source={this.props.dataList[1].url} />
          </View>
          <View style={styles.slide}>
            <Image style={styles.image} source={this.props.dataList[2].url} />
          </View>
          <View style={styles.slide}>
            <Image style={styles.image} source={this.props.dataList[3].url} />
          </View>
          {/**/}
       </Swiper>
    );
  }
  componentDidMount() {
    console.log(this.props.dataList);
  }
}

const styles = StyleSheet.create({
  container: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width:deviceWidth,
    flex: 1
  },
});
{/**/}
module.exports = MySwiper;