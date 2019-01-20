import React, {Component} from 'react';
import { StyleSheet, Text,Linking, Alert, View, Dimensions, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import DissItem from '../Common/dissItem';
import PlayButton from '../Common/playButton';
import { WhiteSpace,Button } from 'antd-mobile-rn';
const deviceWidth = Dimensions.get('window').width;
const basePx = 375;
function px2dp(px) {
  return (px * deviceWidth) / basePx;
}
//评论列表API
const griddata='https://ticket-api-m.mtime.cn/movie/hotComment.api?movieId=';
// const griddata = Array.from(new Array(9)).map((_val, i) => ({
//   icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
//   text: `Name${i}`,
// }));
export default class MovieVedio extends Component {
  constructor(props){
    super(props);
    const { navigation } = this.props;
    this.state = {
      loading:false,
      movieData:movieData.data,//{},
      expend:false,
      dissList:[{}],
      name:navigation.getParam("name", "预告片"),
      relatedID:navigation.getParam("relatedID", []),
      stateImg:navigation.getParam("stateImgList", {list:[]}),
    };
    console.log(this.state);
  }
  videos=[];
  componentWillMount(){
    const { navigation } = this.props;
    this.videos = navigation.getParam("videos", "some default value");
  }

  render() {
    let data = this.videos;
    let postUrl = data.img;
    let griddata =this.state.stateImg.list.map((_val, i) => ({
      icon: _val.imgUrl,
      text: _val.imgId,
    }));
    console.log(griddata);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.postView}>
          <TouchableOpacity onPress={() => this.toMovieVedio(data)}>
            <Image
              style={styles.post}
              source={{ uri: postUrl }}
            />
            <View style={styles.playBtn}>
              <PlayButton />
            </View>
          </TouchableOpacity>
        </View>
        <WhiteSpace size="sm" />
        <View style={styles.content}>
          <Button onPress={()=>{}}>
            剧照
          </Button>
          <View style={styles.grid}>
            {this.renderGridItem(griddata)}
          </View>
        </View>
        <DissItem list={this.state.dissList} />
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
  renderGridItem(data){
    let gridItem = data.map((vel,key)=>{
      return(
        <View style={styles.gridView} key={key}>
          <Image
            style={styles.gridImg}
            source={{ uri: vel.icon }}
          />
          <Text style={styles.gridText}>{vel.text}</Text>
        </View>
      )
    })
    return gridItem;
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
  getMovieDiss() {
    fetch(`${griddata}${this.state.relatedID}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(arr => {
        this.setState({
          dissList: arr.data.mini.list
        });
        console.log(arr);
        // this.setState({loading:false});
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.getMovieDiss();
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
    position:'relative'
  },
  playBtn:{
    position:'absolute',
    bottom:10,
    right:20,
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
  grid:{
    flexDirection:'row',
    flex:1,
    flexWrap: 'wrap'
  },
  gridView:{
    paddingLeft:3,
    width:deviceWidth*0.33,
    height:150,
    justifyContent:'center',
    alignItems:'center'
  },
  gridImg:{
    width:'80%',
    height:120,
    backgroundColor:'rgba(0,0,0,0.3)'
  },
  gridText:{
    textAlign:'center'
  }
});
