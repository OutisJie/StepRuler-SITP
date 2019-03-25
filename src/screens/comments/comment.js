import React from 'react';
import { Platform , View} from 'react-native';
import PropTypes from 'prop-types';
import { GiftedChat } from 'react-native-gifted-chat';
import emojiUtils from 'emoji-utils';

import SlackMessage from './SlackMessage';

export default class Comment extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
            avatar: 'http://sucimg.itc.cn/avatarimg/0eda64d8604e4d41a8a1aeef0211a68e_1522396503859',
          },
        },
        {
          _id: 2,
          text: '真棒',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: '赵云',
            avatar: 'http://sucimg.itc.cn/avatarimg/df271ebf33e9458d9c9afbc2be0edf19_1404094310634',
          },
        },
        {
          _id: 3,
          text: '听上去很不错的样子',
          createdAt: new Date(),
          user: {
            _id: 3,
            name: 'sayo',
            avatar: 'http://sucimg.itc.cn/avatarimg/f3a5818391024edc9690dc885c4e7ec3_1421654797104',
          },
        },
        {
          _id: 4,
          text: '一般般，可以找我取取经',
          createdAt: new Date(),
          user: {
            _id: 4,
            name: '我是大神',
            avatar: 'http://sucimg.itc.cn/avatarimg/2ac4d48b5efb48e0bbb6797589d6d7c3_1514426843046',
          },
        },
        {
          _id: 5,
          text: '哈哈哈哈',
          createdAt: new Date(),
          user: {
            _id: 5,
            name: '哈哈哈',
            avatar: 'http://sucimg.itc.cn/avatarimg/8aced84776794517ae84cb613a757038_1426471717825',
          },
        },
        {
          _id: 6,
          text: '其实我也去过',
          createdAt: new Date(),
          user: {
            _id: 6,
            name: '哈哈哈',
            avatar: 'http://sucimg.itc.cn/avatarimg/8aced84776794517ae84cb613a757038_1426471717825',
          },
        },
        {
          _id: 7,
          text: '不如宅在家玩游戏',
          createdAt: new Date(),
          user: {
            _id: 7,
            name: '游戏王',
            avatar: 'http://sucimg.itc.cn/avatarimg/c20be0277a18462b9999b70f6a3c96d1_1448849749130',
          },
        },
        {
          _id: 8,
          text: '哈哈哈哈哈',
          createdAt: new Date(),
          user: {
            _id: 8,
            name: '游戏王',
            avatar: 'http://sucimg.itc.cn/avatarimg/c20be0277a18462b9999b70f6a3c96d1_1448849749130',
          },
        },
        {
          _id: 9,
          text: '一般般，可以找我取取经',
          createdAt: new Date(),
          user: {
            _id: 9,
            name: '游戏王',
            avatar: 'http://sucimg.itc.cn/avatarimg/c20be0277a18462b9999b70f6a3c96d1_1448849749130',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    const item = {
      _id: 12,
      text: messages[0].text,
      createdAt: new Date(),
      user: {
        _id: 12,
        name: 'WuJie',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      },
    }
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [item]),
    }))
  }

  renderMessage(props) {
    const { currentMessage: { text: currText } } = props;

    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      };
    }

    return (
      <SlackMessage {...props} messageTextStyle={messageTextStyle} />
    );
  }

  renderFooter = (props) => {
      return (
        <View style={{paddingBottom: 15}}>
        </View>
      );
  };

  renderCustomActions = (props) => {
    return <View style={{marginBottom: 20}}></View>
  };


  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
        renderMessage={this.renderMessage}
        renderFooter={this.renderFooter}
        renderCustomActions={this.renderCustomActions}
      />
    );
  }

}