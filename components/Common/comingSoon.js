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

class ComingSoon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
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
        {this._renderItem(this.props.list.moviecomings)}
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
    if(data.length){
      let movieItem = data.map(function (item) {
        return (
          <TouchableOpacity key={item.id} onPress={() => {that.toMovieDetail(item.alt)}}>
            <View style={styles.newsItem}>
              <Image
                style={styles.newsImage}
                source={{ uri: item.image }}
              />
              <View style={styles.average}>
                <Text style={styles.score}>{item.releaseDate}</Text>
              </View>
              <View style={styles.foot}>
                <Text style={styles.newsTitle} numberOfLines={1}>{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) 
      })
      return movieItem;
    }
  };

  componentDidMount() {
    //this.getIn_theaters(this.state.start,this.state.count,true);
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
    fontSize:15,
    color:'yellow',
    justifyContent:'center',
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
module.exports = ComingSoon;