import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,AsyncStorage,Dimensions } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Tabs } from 'antd-mobile-rn';
import MovieList from '../Common/movieList';
import ComingSoon from '../Common/comingSoon';
import MovieDetail from './movieDetail';
import MovieVideo from './MovieVideo';
// import movieData from "../Movie/list";
const deviceWidth = Dimensions.get('window').width;
const basePx = 375;
let childName='电影详情';
function px2dp(px) {
  return px *  deviceWidth / basePx
}
class movie extends Component {
  static navigationOptions = {
    headerStyle: {
      display: 'none',
    },
  };
  constructor(props){
    super(props);
    this.state = {
      // in_theaters:movieData.in_theaters,
      // coming_soon:movieData.coming_soon,
      in_theaters:{ms:[]},
      coming_soon:{moviecomings:[]},
      text:'初始值',
    };
  }
  componentWillMount(){
    this._retrieveData("in_theaters");
    this._retrieveData("coming_soon");
  }
  _retrieveData = async (name) => {
    var that = this;
    try {
      const value = await AsyncStorage.getItem(name);
      if(name==="in_theaters"){
        if (value) {
          that.setState({
            in_theaters: JSON.parse(value)
          });
        }
      }else{
        if (value) {
          that.setState({
            coming_soon: JSON.parse(value)
          });
        }
      }
     } catch (error) {
       // Error retrieving data
     }
  }
  _storeData = async (name,string) => {
    try {
      await AsyncStorage.setItem(name, string);
    } catch (error) {
      // Error saving data
    }
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
              <MovieList 
              list={this.state.in_theaters} 
              text={this.state.text}
              toMovieDetail={this.toMovieDetail.bind(this)}
              />
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
  //获取正在热映
  getIn_theaters() {
    fetch("https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=290", {
      method: "GET"
    })
      .then(response => response.json())
      .then(arr => {
        this._storeData("in_theaters", JSON.stringify(arr));
        this.setState({
          in_theaters: arr
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  //获取即将上映
  getComing_soon() {
    fetch("https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=290", {
      method: "GET"
    })
      .then(response => response.json())
      .then(arr => {
        this._storeData("coming_soon", JSON.stringify(arr));
        this.setState({
          coming_soon: arr
        });
        console.log(arr);
      })
      .catch(error => {
        console.log(error);
      });
  }
  toMovieDetail = (url,name) => {
    console.log(url);
    childName = name;
    this.props.navigation.navigate("MovieDetail", {
      movieId: url
    });
  }
  componentDidMount() {
    this.getIn_theaters();
    this.getComing_soon();
  }
}
const RootStack = createStackNavigator(
  {
    Movie: movie,
    MovieDetail:{
      screen:MovieDetail,
      navigationOptions: () => {
        return ({
          title: childName,
          headerStyle:{
            height:45
          }
        })
      },
    },
    MovieVideo: {
      screen:MovieVideo,
      navigationOptions: () => {
        return ({
          title: '预告片',//childName,
          headerStyle:{
            height:45
          }
        })
      }
    }, 
  },
  {
    initialRouteName: "Movie"
  }
);
const Movie = createAppContainer(RootStack);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
module.exports = Movie;