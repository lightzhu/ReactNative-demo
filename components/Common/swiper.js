import React, { Component } from "react";
import { Platform, StyleSheet, Text, View,TouchableOpacity, Image } from "react-native";
import { Dimensions } from "react-native";
import Swiper from "react-native-swiper";

const deviceWidth = Dimensions.get("window").width;
const basePx = 375;

function px2dp(px) {
  return (px * deviceWidth) / basePx;
}

class MySwiper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  componentWillMount(){
    console.log(this.props);
  }
  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false} autoplay={true}>
        {this.renderImageList(this.props.dataList)}
        {/*<View style={styles.slide}>
          <Image
            style={styles.image}
            source={this.props.dataList[0].cover_image_url}
          />
        </View>
        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={this.props.dataList[1].cover_image_url}
          />
        </View>
        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={this.props.dataList[2].cover_image_url}
          />
        </View>
        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={this.props.dataList[3].cover_image_url}
          />
        </View>*/}
      </Swiper>
    );
  }

  renderImageList(data) {
    var listHtml =[];
    for (var i = 0; i < data.length; i++) {
      let articleUrl = 'https://www.toutiao.com' + data[i].article_url;
      listHtml.push(
        <View style={styles.slide} key={i}>
          <TouchableOpacity 
             activeOpacity = {0.8}
             onPress={() => this.props.toDetail(articleUrl)}
          >
            <Image
              style={styles.image}
              source={{ uri: 'http:' + data[i].cover_image_url }}
            />
            <Text
              numberOfLines={1}
              style={styles.title}
              onPress={() => { alert('点击') }}
            >
              {data[i].title}
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
    return listHtml;
  }
  _onPress = (url) => {
    console.log(url);
    // this.props.navigation.navigate('Details', {
    //   otherParam: url,
    // });
  }
  componentDidMount() {
    console.log(this.props.dataList);
  }
}

const styles = StyleSheet.create({
  container: {},
  title:{
    position:'absolute',
    bottom:2,
    backgroundColor:'rgba(0,0,0,0.5)',
    color:'white',
    paddingLeft:5,
    width:deviceWidth
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex:10
  },
  text: {
    color: "#000",
    fontSize: 30,
    fontWeight: "bold"
  },
  image: {
    width: deviceWidth,
    flex: 1
  }
});
{
  /**/
}
module.exports = MySwiper;
