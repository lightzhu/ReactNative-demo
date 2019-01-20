import React, { Component } from "react";
import {StyleSheet, View,Text } from "react-native";
import { Dimensions } from "react-native";
import { WhiteSpace, Card, WingBlank } from 'antd-mobile-rn';

const deviceWidth = Dimensions.get("window").width;
const basePx = 375;

function px2dp(px) {
  return (px * deviceWidth) / basePx;
}

class DissItem extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <View style={{ paddingTop: 30 }}>
        {this.renderDissItem(this.props.list)}
      </View>
    );
  }
  renderDissItem(data){
    let dissList = data.map((val,index)=>{
      return(
        <View key={index}>
          <WingBlank size="lg">
            <Card>
              <Card.Header
                title={val.nickname}
                thumbStyle={{ width: 30, height: 30 }}
                thumb={val.headImg}
                extra=""
              />
              <Card.Body>
                <View style={{ height: 42 }}>
                  <Text style={{ marginLeft: 16 }}>{val.content}</Text>
                </View>
              </Card.Body>
              <Card.Footer
                content={val.locationName}
                extra={val.rating}
              />
            </Card>
          </WingBlank>
          <WhiteSpace size="lg" />
        </View>
      )
    })
    return dissList;
  }
  componentDidMount() {
    console.log(this.props);
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex:10,
  },
});

module.exports = DissItem;
