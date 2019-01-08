import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View,Image,TouchableOpacity,ActivityIndicator} from 'react-native';
import { Dimensions } from 'react-native';
import moviesList from "../Movie/list";
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
      movies:this.props.list.subjects,
      //movies:moviesList.in_theaters.subjects
      loadMore:true,
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
        {this._renderItem(this.state.movies)}
        </View>
        <ActivityIndicator
            size="large"
            color="#0000ff"
            animating={this.state.loadMore}
            hidesWhenStopped={true}
          />
      </ScrollView>
    );
  }
  toMovieDetail = (url) => {
    console.log(url);
    // this.props.navigation.navigate("Details", {
    //   otherParam: url
    // });
  };
  _renderItem = (data) => {
    var that = this;
    let movieItem = data.map(function (item) {
      return (
        <TouchableOpacity key={item.id} onPress={() => {that.toMovieDetail(item.alt)}}>
          <View style={styles.newsItem}>
            <Image
              style={styles.newsImage}
              source={{ uri: item.images.medium }}
            />
            <View style={styles.average}>
              <Text style={styles.score}>{item.rating.average}</Text>
            </View>
            <View style={styles.foot}>
              <Text style={styles.newsTitle} numberOfLines={1}>{item.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) 
    })
    return movieItem;
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
    this.getIn_theaters(this.state.start,this.state.count,true);
  }
  refreshMoviesList(){
    if(this.state.isAll){
      alert("没有更多了");
      this.setState({
        loadMore: fasle
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
  homeScrollEnd(e: Object) {
    var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    if (offsetY + oriageScrollHeight >= contentSizeHeight) {
      alert(1);
      this.refreshMoviesList();
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
  score:{
    fontSize:18,
    color:'yellow',
    flex:1,
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