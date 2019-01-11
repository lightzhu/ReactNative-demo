/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  FlatList,Dimensions,AsyncStorage,RefreshControl,Animated
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import Detail from "./detail";
import HomeSwiper from "../Common/swiper";
// import newsList from "./news";//模拟数据
const deviceWidth = Dimensions.get("window").width;
const basePx = 375;

function px2dp(px) {
  return (px * deviceWidth) / basePx;
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "主页",
    headerTitleStyle: {
      textAlign: "center",
    },
    headerStyle:{
      height:45
    },
    headerRight: (
      <View style={{ marginRight: 10 }}>
        <Icon name="camera" size={20} onPress={() => alert("打开相机!")} />
      </View>
    )
  };
  isLoadingMore = true;
  loader=null;
  newsType=['top','shehui','guonei','yule','tiyu','junshi','keji','caijing','shishang'];//新闻类型
  newsTypeIndex=0;
  newsAPI='http://v.juhe.cn/toutiao/index?key=d6b425961ff54c50c8a4fb7ceb1d63bd&type=';
  constructor(props) {
    super(props);
    this.state = {
      sliderList: [],
      news: [],
      loadMore: true,
      refreshing: false,
      fadeInOpacity: new Animated.Value(0),
      padTop:new Animated.Value(0),
    };
  }
  _retrieveData = async name => {
    try {
      const value = await AsyncStorage.getItem(name);
      return(JSON.parse(value));
    } catch (error) {
      // Error retrieving data
    }
  };
  _storeData = async (name, string) => {
    try {
      await AsyncStorage.setItem(name, string);
    } catch (error) {
      // Error saving data
    }
  };
  _onRefresh = () => {
    this.setState({refreshing: true});
    console.log("下拉刷新");
    Animated.timing(this.state.padTop, {
      toValue: 30, // 目标值
      duration: 200, // 动画时间
    }).start(()=>{
      this.setState({padTop: new Animated.Value(30)});
    });
    this.updateSelf().then((rep)=>{
      setTimeout(()=>{
        this.setState({refreshing: false});
        Animated.timing(this.state.padTop, {
          toValue: 0,
          duration: 400,
        }).start(()=>{
          this.setState({padTop: new Animated.Value(0)});
        });
      },2000)
      
    });
  }
  updateSelf = async()=>{
    await this.getSwiperList();
    //await this.getNewsList("top");
    return null;
  }
  componentWillMount() {
    this._retrieveData("slider_list").then((data)=>{
      this.setState({
        sliderList: data
      });
    });
    this._retrieveData("news_list").then((data)=>{
      this.setState({
        news: data
      });
    });
  }
  render() {
    return (
      <Animated.ScrollView 
        style={{paddingTop:this.state.padTop}}
        alwaysBounceVertical={true}
        onMomentumScrollEnd={this.homeScrollEnd.bind(this)}
        refreshControl={
          <RefreshControl
            progressViewOffset={-15}
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            title={this.state.isRefreshing ? '刷新中....' : '下拉刷新'}
          />
        }
      >
        {/***/}
        <View style={styles.MainSwiper}>
          <HomeSwiper
            dataList={this.state.sliderList}
            toDetail={this.toDetail.bind(this)}
          />
        </View>
        <View style={styles.list}>
          <FlatList
            data={this.state.news}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        </View>
        {/**onEndReached={this.homeScrollEnd.bind(this)}
            onEndReachedThreshold={0.2}*/}
        <View>
          {this.state.loadMore ?
            <ActivityIndicator
              size="large"
              color="#0000ff"
              animating={this.state.loadMore}
              hidesWhenStopped={true}
            /> : <Text style={styles.nomore}>没有更多了☺~☺</Text>
          }
        </View>
      </Animated.ScrollView>
    );
  }
  toDetail(url) {
    this.props.navigation.navigate("Details", {
      otherParam: url
    });
  }
  homeScrollEnd(e: Object) {
    var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    if (offsetY + oriageScrollHeight >= contentSizeHeight-15) {
      if(this.newsTypeIndex>this.newsType.length){
        this.isLoadingMore=false;
        this.setState({
          loadMore: false
        });
      }else{
        this.newsTypeIndex++;
        if(this.isLoadingMore){
          this.getNewsList(this.newsType[this.newsTypeIndex]);
        }
        this.isLoadingMore=false;
      }
    }
  }

  getSwiperList() {
    fetch("https://www.toutiao.com/api/pc/hot_gallery/?widen=1", {
      method: "GET"
    })
      .then(response => response.json())
      .then(arr => {
        console.log(arr);
        this._storeData("slider_list", JSON.stringify(arr.data));
        this.setState({
          sliderList: arr.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getNewsList(type){
    // console.log(`${this.newsAPI}${type}`);
    fetch(`${this.newsAPI}${type}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(arr => {
        console.log(arr);
        this.isLoadingMore=true;
        if(type==="top"){
          this._storeData("news_list", JSON.stringify(arr.result.data));
          this.setState({
            news: arr.result.data
          });
        }else{
          this.setState({
            news: [...this.state.news,...arr.result.data]
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  _keyExtractor = item => item.uniquekey+Math.random(0,10);
  _onPress = url => {
    console.log(url);
    this.props.navigation.navigate("Details", {
      otherParam: url
    });
  };
  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onPress(item.url)}>
      <View style={styles.newsItem}>
        <Image
          style={styles.newsImage}
          source={{ uri: item.thumbnail_pic_s }}
        />
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsFoot}>
          {item.date} {item.author_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
  componentDidMount() {
    // console.log(newsList);
    this.getSwiperList();
    //this.getNewsList('top');
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: {
      screen:Detail,
      navigationOptions: () =>({
        headerStyle:{
          height:45
        }
      }),
    }
  },
  {
    initialRouteName: "Home"
  }
);

const Home = createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  MainSwiper: {
    height: 0.5 * deviceWidth,
    backgroundColor: "#fff"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  nomore:{
    paddingTop:5,
    textAlign:'center',
  },
  image: {
    flex: 1
  },
  newsItem: {
    height: 88,
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "#d6d7da",
    justifyContent: "space-between",
    padding: 5,
    position: "relative"
  },
  newsImage: {
    width: 90,
    height: 80,
    backgroundColor: "pink"
  },
  newsTitle: {
    color: "#4a4a4a",
    width: deviceWidth - 100,
    paddingLeft: 10,
    paddingTop: 6
  },
  newsFoot: {
    position: "absolute",
    top: 60,
    right: 10,
    fontSize: 12,
    color: "#bbb"
  }
});
module.exports = Home;
