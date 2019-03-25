import React from 'react'

import NavAbsolute from './NavAbsolute'
import { createStackNavigator } from 'react-navigation';
import Chat from './chat'

class ChatIndex extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header:
      <NavAbsolute
        navigation={navigation}
        title={'React Native'}
        subTitle={''}
      />,
    headerStyle: {
      backgroundColor: '#007AFF',
    }
  })
  constructor(props){
    super(props)
  }
  render(){
    return <Chat navigation={this.props.navigation}/>
  }
}


const ChatStack = createStackNavigator({
  Chat: ChatIndex,
  
})

export default ChatStack