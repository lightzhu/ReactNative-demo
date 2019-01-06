/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, ScrollView, Text, View,Button,Image,TouchableOpacity,FlatList} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import Detail from './detail';
import HomeSwiper from '../Common/swiper';

import newsList from './news';
const deviceWidth = Dimensions.get('window').width;
const basePx = 375

function px2dp(px) {
  return px *  deviceWidth / basePx
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '主页',
    headerTitleStyle:{
      textAlign: 'center',
    },
    headerRight: (
       <View style={{ marginRight: 10 }}>
        <Icon name="camera" size={20}  onPress={()=>alert('打开相机!')}></Icon>
       </View>
    ),

  };

  constructor(props) {
    super(props);
    this.state = {
        sliderList: [
            {
            'title':'01',
            'cover_image_url':require('../../src/img/1.jpg')
            },
            {
            'title':'02',
            'cover_image_url':require('../../src/img/2.jpg')
            },
            {
            'title':'03',
            'cover_image_url':require('../../src/img/3.jpg')
            },
            {
            'title':'04',
            'cover_image_url':require('../../src/img/4.jpg')
            }
        ],
        news:newsList.result.data
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.MainSwiper}>
          <HomeSwiper dataList={this.state.sliderList} toDetail={this.toDetail.bind(this)}/>
        </View>
        <View style={styles.list}>
           <FlatList
              data={this.state.news}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
           />
        </View>
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            });
          }}
        />
      </ScrollView>
    );
  }
  toDetail(url){
    this.props.navigation.navigate('Details', {
      otherParam: url,
    });
  }
  getSwiperList() {
    fetch("https://www.toutiao.com/api/pc/hot_gallery/?widen=1", { method: "GET", })
      .then((response) => response.json())
      .then(arr => {
        console.log(arr);
        this.setState({
          sliderList: arr.data
        })
      })
      .catch(error => {
        console.log(error);
      });
  }
  _keyExtractor = (item) => item.uniquekey;
  _onPress = (url) => {
       console.log(url);
       this.props.navigation.navigate('Details', {
        otherParam: url,
      });
  }
  _renderItem = ({item}) => (
    <TouchableOpacity onPress={() => this._onPress(item.url)}>
      <View style={styles.newsItem}>
        <Image style={styles.newsImage} source={{ uri: item.thumbnail_pic_s }} />
        <Text style={styles.newsTitle}>
          {item.title}
        </Text>
        <Text style={styles.newsFoot}>
          {item.date}  {item.author_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
  componentDidMount() {
    console.log(newsList);
    this.getSwiperList();
  }
}


{/*
class detail extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>这是详情页</Text>
      </View>
    );
  }
}
*/}


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: Detail,
  },
  {
    initialRouteName: 'Home',
  }
);

const Home = createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  MainSwiper:{
    height: 0.5*deviceWidth,
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  image:{
    flex:1,
  },
  newsItem:{
    height:88,
    flexDirection:'row',
    borderBottomWidth: 0.5,
    borderColor: '#d6d7da',
    justifyContent:'space-between',
    padding:5,
    position:'relative'
  },
  newsImage: {
    width: 90,
    height: 80,
    backgroundColor:'pink'
  },
  newsTitle: {
    color:'#4a4a4a',
    width:(deviceWidth-100),
    paddingLeft:10,
    paddingTop:6
  },
  newsFoot:{
    position:'absolute',
    top:60,
    right:10,
    fontSize:12,
    color:'#bbb'
  }
});
module.exports = Home;
