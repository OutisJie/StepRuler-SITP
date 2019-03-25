import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import utils from '../../../common/utils'
import styleUtil from '../../../config/style'
import { Avatar, Icon, Tile, Text, Image } from 'react-native-elements'
import { Label } from 'teaset'
import { NavigationActions } from 'react-navigation';

const icons = item => (
  [
    {
      name: item.isLike ? 'ios-heart' : 'ios-heart-outline',
      color: item.isLike ? '#FF4500' : 'black',
      count: item.likes
    },
    { name: 'ios-chatbubbles', count: item.comments },
    { name: 'md-share', count: item.shares },
  ]
);

const img_anonymous = require('../../../../assets/images/anonymous.png')
const img_label = require('../../../../assets/images/label.png')
const img_male = require('../../../../assets/images/limit_male.png')

export default class TopicItem extends React.Component {
  state = {
    item: this.props.item
  };

  updateItem = item => {
    this.setState({ item })
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.item !== nextProps.item) {
      this.setState({ item: nextProps.item })
    }
  }

  render() {
    const { item } = this.state;
    // const goArticle = NavigationActions.navigate({
    //   routeName: 'Article',
    //   params: item
    // })
    return (
      <TouchableOpacity
        style={style.container}
        activeOpacity={0.5}
        onPress={_ => {
          this.props.navigation.navigate('Article', item)
        }}
      >
        <View style={style.card}>
          {/* 图片 */}
          {item.image &&
            <Tile
              imageSrc={{ uri: item.image }}
              title={item.title}
              featured={true}
              caption="Some Caption Text"
              height={(styleUtil.window.width - 20) * 0.618}
              imageContainerStyle={style.tile}
            />
          }
          {/* 描述 */}
          <View style={{ padding: 20 }}>
            <View style={style.desc}>
              <View style={style.desc_user}>
                <Avatar 
                  rounded 
                  size='medium'
                  title={item.user.username}
                  source={{ uri: item.isHidden ? img_anonymous : item.user.avatar }}
                  containerStyle={{
                    marginRight: 10,
                    borderColor: styleUtil.borderColor,
                    borderWidth: styleUtil.borderSeparator
                  }}
                  onPress={_ => {
                    if (!item.isHidden) {
                      // navigate.push(<Text>Profile</Text>, { _id: item.user._id })
                    }
                  }}
                  />
                <View>
                  <Label style={{ marginBottom: 5 }} text={item.isHidden ? '匿名用户' : item.user.username} />
                  <Label type={'detail'}
                    text={utils.showTime(item.createdAt)} />
                </View>
              </View>
              <View style={style.desc_right}>
                <View style={style.desc_right_up}>
                  <View style={style.desc_label}>
                    <Image source={img_label} style={{ width: 16, height: 16 }} />
                    <Text style={{ color: '#666', fontSize: 14 }}>{item.categoryName}</Text>
                  </View>
                  <Image source={img_male} style={{ width: 18, height: 18 }} />
                </View>
                <Text style={{
                  color: item.isJoin ? styleUtil.successColor : 'red',
                  fontSize: 12
                }}>{item.isJoin ? '已关注' : '未关注'}</Text>
              </View>
            </View>
            <Text numberOfLines={5} style={style.content}>{item.content}</Text>
            <View style={{
              height: styleUtil.borderSeparator,
              backgroundColor: styleUtil.borderColor,
              marginTop: 8,
              marginBottom: 8
            }} />

            {/* 社交 */}
            <View style={style.social}>
              <View style={{ flexDirection: 'row' }}>
                {icons(item).map((v, i) => (
                  <View key={i} style={style.social_item}>
                    <Icon
                      name={v.name}
                      type={'ionicon'}
                      size={18}
                      color={v.color || 'black'}
                    />
                    <Text style={style.social_text}> {utils.numberToTenThousand(v.count)}</Text>
                  </View>
                ))}
              </View>
              <Text style={style.social_total}>参与人数 {utils.numberToTenThousand(item.joins)}</Text>
            </View>
          </View>
        </View>

      </TouchableOpacity>
    )
  }
}

const style = StyleSheet.create({
  container: {
    borderColor: styleUtil.borderColor,
    shadowColor: 'black',
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: { height: 1, width: 0 }
  },
  card: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 5,
    overflow: 'hidden',
    // borderWidth:1,
  },
  tile: {
    width: styleUtil.window.width - 20,
    height: (styleUtil.window.width - 20) * 0.618,
    backgroundColor: '#ccc',
    // borderRadius:5
  },
  desc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  desc_user: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  desc_label: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20
  },
  desc_right: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 34
  },
  desc_right_up: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    fontSize: 16,
    lineHeight: 20,
    color: '#333',
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  social_item: {
    flexDirection: 'row',
    marginRight: 12
  },
  social_text: {
    color: '#666',
    fontSize: 14
  },
  social_total: {
    textAlign: 'right',
    color: '#666',
    fontSize: 14
  }

})