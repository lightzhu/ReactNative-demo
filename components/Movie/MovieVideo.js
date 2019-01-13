import React, {Component} from 'react';
import { StyleSheet, Text,Linking, Alert, View, Dimensions, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const basePx = 375;
function px2dp(px) {
  return (px * deviceWidth) / basePx;
}
export default class MovieVedio extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading:false,
      movieData:movieData.data,//{},
      expend:false,
      name:'预告片',
      related:[]
    };
  }
  movieId={};
  videos=[];
  componentWillMount(){
    const { navigation } = this.props;
    this.videos = navigation.getParam("videos", "some default value");
    this.setState({
      name:navigation.getParam("name", "预告片"),
      related:navigation.getParam("related", [])
    })
    console.log(this.state);
  }

  render() {
    let data = this.videos;
    let postUrl = data.img;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.postView}>
        <TouchableOpacity onPress={() => this.toMovieVedio(data)}>
            <Image
              style={styles.post}
              source={{ uri: postUrl }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text>2222</Text>
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
  toMovieVedio = (video) => {
    console.log(video);
    Linking.canOpenURL(video.hightUrl).then(supported => {
      if (!supported) {
        Alert.alert(
          '提示',
          '无法打开',
          [
            {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: '确定', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      } else {
        return Linking.openURL(video.hightUrl);
      }
    }).catch(err => console.error('An error occurred', err));
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
    padding:5,
    backgroundColor:'rgba(42, 80, 140, 0.2)',
  },
  post:{
    width:deviceWidth-10,
    height:0.56*(deviceWidth-10),
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
