import React, {Component} from 'react';
import { StyleSheet, Text,Image, View,Dimensions,Modal, FlatList,TouchableOpacity} from 'react-native';
import { List } from 'antd-mobile-rn';
import ImageViewer from 'react-native-image-zoom-viewer';
const Item = List.Item;
const Brief = Item.Brief;
const deviceWidth = Dimensions.get('window').width;
const basePx = 375;
const images=[
  {
    url: "http://img5.mtime.cn/mt/2018/12/04/160518.62113167_1280X720X2.jpg",
  },
  {
    url: "http://img5.mtime.cn/mt/2018/12/04/160518.62113167_1280X720X2.jpg",
  },
  {
    url: "http://img5.mtime.cn/mt/2018/12/24/092751.50837833_1280X720X2.jpg",
  },
];
  
function px2dp(px) {
  return px *  deviceWidth / basePx
}
class actors extends Component {
  constructor(props){
    super(props);
    this.state = {
      text:'初始值',
      modalVisible: false,
      index:0,
    };
  }
  componentWillMount(){
    console.log(this.props.actorList);
  }
  _keyExtractor = (item,index) => item.actorId.toString()+Math.random(0,10);
  _onPress = (url,key) => {
    console.log(url,key);
    this.setState({
      modalVisible:true,
      index:key,
    })
  };
  _renderItem = ({item,index}) => (
    <TouchableOpacity onPress={() => this._onPress(item.img,index)}>
      <View style={styles.actorItem}>
        <Image
          style={styles.actorImage}
          source={{ uri:item.img }}
          resizeMode='cover'
          resizeMethod='auto'
        />
        {item.directorId?<Text style={styles.director}>导演</Text>:null}
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.name}>{item.nameEn}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.modalVisible}
          transparent={false}
          onRequestClose={() => this.setState({ modalVisible: false })}>
          <ImageViewer 
            imageUrls={images} 
            index={this.state.index} 
            failImageSource={()=>{return ({
              url: "http://img5.mtime.cn/mt/2018/12/04/160518.62113167_1280X720X2.jpg",
            })}}
            onClick={this.imageViewerClick}
          />
        </Modal>
        <List style={styles.list}>
          <Item extra="" arrow="horizontal" onPress={() => {}}>
            导演、演员
          </Item>
        </List>
        <View>
          <FlatList
            horizontal={true}
            data={this.props.actorList}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        </View>
      </View>
    );
  }
  setImagesList(data){
    let images=[];
    data.forEach(element => {
      element.url=element.img;
      images.push(element);
    });
  }
  imageViewerClick(){
    // alert(0);
  }
  componentDidMount() {
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list:{
    marginTop:10,
  },
  actorItem:{
    marginTop:5,
    width:deviceWidth*0.33,
    marginRight:5,
    alignItems:'center',
    position:'relative',
  },
  director:{
    position:'absolute',
    top:5,
    right:15,
    width:40,
    backgroundColor:'#58ab0e',
    color:'#fff',
    textAlign:'center'
  },
  actorImage:{
    width:deviceWidth*0.29,
    height:180,
    backgroundColor:'#2bb1e6',
  },
  name:{
    alignItems: 'center',
    justifyContent: 'center',
  },
});
module.exports = actors;