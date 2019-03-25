import React from 'react'
import PropTypes from 'prop-types'

import articleData from './article.json'
import NavAbsolute from './NavAbsolute'
import Article from './Article'
import { createStackNavigator } from 'react-navigation';

class ArticleIndex extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header:
      <NavAbsolute
        navigation={navigation}
        title={articleData.title}
        subTitle={articleData.address}
      />
  })
  constructor(props){
    super(props)
  }
  render(){
    return <Article {...articleData} navigation={this.props.navigation}/>
  }
}


const ArticleStack = createStackNavigator({
  Article: ArticleIndex,
  
})

export default ArticleStack