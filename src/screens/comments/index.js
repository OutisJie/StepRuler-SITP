import React from 'react'

import NavAbsolute from '../chat/NavAbsolute'
import { createStackNavigator } from 'react-navigation';
import Comment from './comment'

class CommentIndex extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header:
      <NavAbsolute
        navigation={navigation}
        title={'评论'}
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
    return <Comment navigation={this.props.navigation}/>
  }
}


const CommentStack = createStackNavigator({
  Comment: CommentIndex,
  
})

export default CommentStack