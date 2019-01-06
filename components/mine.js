'use strict';

import React ,{ Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native';

export default class mine extends Component{
  constructor(props) {
    super(props);
    this._handlePress = this._handlePress.bind(this);
  }

  render() {
    return (
        <View>
            <Text style={styles.container}>个人中心</Text>
        </View>
    );
  }

  _handlePress(event) {
    console.log(0);
  }
}

let styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
  },
  container: {
    color:"red",
    fontSize: 20,
  },
  tabStyle:{
    color:"red"
  }
});
