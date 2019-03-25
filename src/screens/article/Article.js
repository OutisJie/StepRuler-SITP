import React, { Component } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image
} from "react-native";

import { Text, Card, Avatar} from 'react-native-elements';
import PropTypes from "prop-types";
import PhotoButton from "./PhotoButton";
import ProductStyles from "./styles";
import { data } from "../sample";
import _ from "lodash";
import colors from '../../config/style';


const styles = StyleSheet.create({ ...ProductStyles });
const item = data[0];
const users = [
  {
    name: "非常不错的文章",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
  },
  {
    name: "真想去玩一玩",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg"
  },
  {
    name: "刺激",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg"
  },
  {
    name: "写的不错",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg"
  },
  {
    name: "good",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg"
  },
  {
    name: "very good",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"
  }
];
const list3 = [
  {
    image_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    icon: null,
    title: null
  },
  {
    image_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    icon: null,
    title: null
  },
  {
    image_url: null,
    icon: null,
    title: "LR"
  },
  {
    image_url: null,
    icon: { name: "user", type: "font-awesome" },
    title: null
  },
  {
    image_url: null,
    icon: { name: "user-female", type: "simple-line-icon" },
    title: null
  },
  {
    image_url: null,
    icon: { name: "baidu", type: "entypo" },
    title: null
  }
];

export default class Article extends Component {
  static propTypes = {
    img: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
  };

  static defaultProps = {
    containerStyle: {}
  };

  constructor(props){
    super(props)
    this.state = {
      show: false
    }
  }

  renderNavigator = () => {
    return (
      <View>
        <Text style={styles.detailText}>{item.title}</Text>
        <Text style={styles.subDetailText}>{item.content}</Text>
      </View>
    );
  };

  renderDescription = () => {
    return (
      <View>
        <Text style={styles.priceText}>{`作者：${item.user.username}`}</Text>
        <Text style={styles.descriptionText}>{`类型：${
          item.categoryName
          }`}</Text>
        <Text style={styles.descriptionText}>{`时间：${item.createdAt}`}</Text>
        <Text style={styles.descriptionText}>{`分享：${item.shares}`}</Text>
      </View>
    );
  };

  renderDetail = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={[styles.navigatorButton, { flex: 2 }]} onPress={()=>this.setState({show: true})}>
          <Text style={styles.navigatorText}>评论</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navigatorButton, { flex: 1 }]}>
          <Text style={styles.navigatorText}>分享</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderContactHeader = () => {
    // const item  = this.props.navigation.state.params
    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <ImageBackground
            source={{
              uri: item.image
            }}
            style={styles.coverImage}
          >
            <PhotoButton />
          </ImageBackground>
        </View>
      </View>
    );
  };

  render() {
    const {show} = this.state
    return (
      <View style={styles.mainviewStyle}>
        <ScrollView style={styles.scroll}>
          <View style={[styles.container, this.props.containerStyle]}>
            <View style={styles.cardContainer}>
              {this.renderContactHeader()}
            </View>
          </View>
          <View style={styles.productRow}>{this.renderDescription()}</View>
          <View style={styles.productRow}>{this.renderNavigator()}</View>
          <View style={styles.productRow}>{this.renderDetail()}</View>
          <View style={styles.container}>
            {show &&
              <Card title="评论">
                {users.map((u, i) => {
                  return (
                    <View key={i} style={_styles.user}>
                      <Image
                        style={_styles.image}
                        resizeMode="cover"
                        source={{ uri: u.avatar }}
                      />
                      <Text style={_styles.name}>{u.name}</Text>
                    </View>
                  );
                })}
              </Card>
            }
            <Card
              containerStyle={{
                marginTop: 15,
                marginBottom: 15
              }}
              title="参与者"
            >
              {_.chunk(list3, 3).map((chunk, chunkIndex) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginBottom: 10
                  }}
                  key={chunkIndex}
                >
                  {chunk.map((l, i) => (
                    <Avatar
                      large
                      rounded
                      source={l.image_url ? { uri: l.image_url } : null}
                      icon={l.icon}
                      title={l.title}
                      key={`${chunkIndex}-${i}`}
                    />
                  ))}
                </View>
              ))}
            </Card>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: colors.greyOutline,
    backgroundColor: '#fff',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FD6B78',
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
});
