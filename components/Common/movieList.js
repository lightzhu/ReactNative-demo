import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View,Image,TouchableOpacity,ActivityIndicator} from 'react-native';
import { Dimensions } from 'react-native';
import { Toast } from 'antd-mobile-rn';
const deviceWidth = Dimensions.get('window').width;
const basePx = 375
const itemWidth = deviceWidth / 3;
function px2dp(px) {
  return px *  deviceWidth / basePx
}

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      loader:true,
      start:0,
      count:20,
      total:0,
      isAll:false
    };
  }
  render() {
    return (
      <ScrollView
        onMomentumScrollEnd={this.homeScrollEnd.bind(this)}
      >
        <View style={styles.list}>
        {/** */}
        {this._renderItem(this.props.list.ms)}
        </View>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          animating={this.state.loadMore}
          hidesWhenStopped={true}
        />
        {/** */}
      </ScrollView>
    );
  }
  toMovieDetail = (id,name) => {
    this.props.toMovieDetail(id,name);
  };
  renderText=(data)=>{
    return(<Text style={styles.score}>{data}</Text>)
  }
  _renderItem = (data) => {
    var that = this;
    if(data.length){
      let movieItem = data.map(function (item) {
        return (
          <TouchableOpacity key={item.id} onPress={() => {that.toMovieDetail(item.id,item.tCn)}}>
            <View style={styles.newsItem}>
              <Image
                style={styles.newsImage}
                source={{ uri: item.img }}
              />
              <View style={styles.average}>
                <Text style={styles.score}>{(item.r<=0)?'':item.r+'分'}</Text>
                <Text style={styles.movieType} numberOfLines={1}>{item.movieType}</Text>
              </View>
              <View style={styles.foot}>
                <Text style={styles.newsTitle} numberOfLines={1}>{item.tCn}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) 
      })
      return movieItem;
    }
  };

  getIn_theaters(start,count,first){
    fetch(`https://api.douban.com/v2/movie/in_theaters?start=${start}&count=${count}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(arr => {
        console.log(arr);
        this.setState({
          start: (this.state.start+20),
          total:arr.total
        });
        if(first){
          this.setState({
            movies: arr.subjects
          });
        }else{
          this.setState({
            movies: [...this.state.movies,...arr.subjects]
          });
          console.log(this.state.movies);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidMount() {
    //this.getIn_theaters(this.state.start,this.state.count,true);
  }
  refreshMoviesList(){
    if(this.state.isAll){
      alert("没有更多了");
      this.setState({
        loadMore: false
      });
      return
    }
    if((this.state.start)>=this.state.total){
      this.setState({
        isAll:true
      })
    }
    this.getIn_theaters(this.state.start,this.state.count);
  }
  showToastNoMask() {
    Toast.info('没有更多了', 1, undefined, false);
  }
  homeScrollEnd(e: Object) {
    var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    if (offsetY + oriageScrollHeight >= contentSizeHeight) {
      this.showToastNoMask();
      this.setState({
        loadMore: false
      });
      //this.refreshMoviesList();
    }
  };
}

const styles = StyleSheet.create({
  list:{
    flexDirection:'row',
    flexWrap:'wrap'
  },
  newsItem: {
    width:itemWidth,
    borderBottomWidth: 0.5,
    borderColor: "#d6d7da",
    padding: 5,
    position: "relative",
    flex:1,
    alignItems:'center',
  },
  newsImage: {
    width: itemWidth-10,
    height: (itemWidth-10)*1.47,
    backgroundColor: "transparent"
  },
  average:{
    position:'absolute',
    flexDirection:'row',
    paddingLeft:5,
    bottom:28,
  },
  movieType:{
    fontSize:10,
    flex:3,
    color:'#fff',
    lineHeight:20,
    backgroundColor:'rgba(116, 171, 52, 0.8)',
    alignItems:'center'
  },
  score:{
    fontSize:15,
    color:'yellow',
    flex:2,
  },
  foot: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-around',
    paddingTop:5,
  },
  newsTitle: {
  },
});
{/**/}
module.exports = MovieList;