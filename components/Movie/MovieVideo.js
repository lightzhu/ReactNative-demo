import React, {Component} from 'react';
import { StyleSheet, Text, View, AsyncStorage, Dimensions, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import movieData from "../../src/data/movieDetail";
import Icon from 'react-native-vector-icons/FontAwesome';
//import VideoPlayer from "../Common/VideoPlayer";
const deviceWidth = Dimensions.get('window').width;
const basePx = 375;
function px2dp(px) {
  return (px * deviceWidth) / basePx;
}
export default class MovieVedio extends Component {
  // static navigationOptions = {
  //   title: "电影详情"
  // };
  constructor(props){
    super(props);
    this.state = {
      loading:false,
      movieData:movieData.data,//{},
      expend:false,
    };
  }
  movieId={};
  componentWillMount(){
    const { navigation } = this.props;
    this.videos = navigation.getParam("videos", "some default value");
    console.log(this.videos);
  }

  render() {
    let data = this.state.movieData.basic;
    console.log(this.state.movieData);
    let postUrl = data.img;
    return (
      <ScrollView style={styles.container}>
        {/**<Text style={styles.welcome}>这是列dd表页</Text>*/}
        <View style={styles.postView}>
          <Image
            style={styles.post}
            source={{ uri: 'http://img31.mtime.cn/ph/2016/08/26/103620.34111419_1280X720X2.jpg' }}
          />
          <View style={styles.desc}>
            <Text style={{color: 'white', fontSize: 20, }}>{data.name}</Text>
            <Text style={styles.info}>{data.nameEn}</Text>
            <Text style={styles.info}>{data.type.join("/")}</Text>
            <Text style={styles.info}>片长：{data.mins}</Text>
            <Text style={styles.info}>{data.releaseDate}-{data.releaseArea}上映</Text>
            <Text style={styles.info}>{data.commentSpecial}</Text>
            <View style={styles.screen}>
              {data.isDMAX?<Text style={styles.screenType}>中国巨幕</Text>:null}
              {data.isIMAX3D?<Text style={styles.screenType}>IMAX3D</Text>:null}
              {data.isIMAX?<Text style={styles.screenType}>IMAX</Text>:null}
              {data.is3D?<Text style={styles.screenType}>3D</Text>:null}
            </View>
          </View>
          <Text style={styles.rate}>{data.overallRating}</Text>
        </View>
        <View style={styles.content}>
          <Text>{data.story}</Text>
        </View>
        <ActivityIndicator
          style={styles.load}
          size="large"
          color="#0000ff"
          animating={this.state.loading}
          hidesWhenStopped={true}
        />
      </ScrollView>
    );
  }

  getMovieDetail() {
    fetch(`${this.movieDetailUrl}${this.movieId}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(arr => {
        this._storeData("movie_particulars", JSON.stringify(arr.data));
        this.setState({
          movieData: arr.data
        });
        console.log(arr);
        this.setState({loading:false});
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidMount() {
    //this.getMovieDetail();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  load:{
    flex:1,
    justifyContent: 'center',
    top:0,
    right:0,
    bottom:0,
    left:0,
    position:'absolute'
  },
  postView:{
    flexDirection:'row',
    padding:15,
    backgroundColor:'rgba(42, 80, 140, 0.8)',
  },
  post:{
    width:105,
    height:164,
    borderWidth:1,
    borderColor:'#fff',
  },
  desc:{
    color:'#fff',
    paddingLeft:10,
  },
  info:{
    color:'#fff',
    fontSize:14
  },
  rate:{
    width:40,
    height:40,
    textAlign:'center',
    backgroundColor:'#679c21',
    lineHeight:40,
    position:'absolute',
    right:20,
    top:20,
    color:'#fff',
    fontSize:15
  },
  screen:{
    flexDirection:'row',
    paddingTop:8,
  },
  screenType:{
    color:'#0c183c',
    lineHeight:20,
    textAlign:'center',
    paddingLeft:5,
    paddingRight:5,
    borderColor:"#000",
    borderWidth:1,
    marginRight:8,
  },
  content:{
    marginLeft:10,
    marginRight:10,
    marginTop:20,
    paddingTop:6,
    borderTopColor:'#c0c0c0',
    borderTopWidth:2,
  },
  contentText:{
    lineHeight:22,
  }
});
