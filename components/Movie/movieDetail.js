import React, {Component} from 'react';
import {StyleSheet, Text, View,AsyncStorage,Dimensions } from 'react-native';
import { Tabs } from 'antd-mobile-rn';
const deviceWidth = Dimensions.get('window').width;
const basePx = 375
export default class movieDetail extends Component {
  // static navigationOptions = {
  //   title: "电影详情"
  // };
  constructor(props){
    super(props);
    this.state = {
      in_theaters:{ms:[]},
      coming_soon:{moviecomings:[]},
    };
  }
  movieDetailUrl="https://ticket-api-m.mtime.cn/movie/detail.api?locationId=290&movieId=";
  componentWillMount(){
    // this._retrieveData("in_theaters");
    // this._retrieveData("coming_soon");
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
    const { navigation } = this.props;
    const movieId = navigation.getParam("movieId", "some default value");
    console.log(movieId);
    return (
      <View style={styles.container}>
        {/**<Text style={styles.welcome}>这是列dd表页</Text>*/}
        <View style={{ flex: 1 }}>
        <Text style={styles.welcome}>这是电影详情页</Text>
        </View>
      </View>
    );
  }

  toMovieVedio = (url) => {
    console.log(url);
    // this.props.navigation.navigate("Details", {
    //   otherParam: url
    // });
  }
  componentDidMount() {
    // this.getIn_theaters();
    // this.getComing_soon();
  }
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
