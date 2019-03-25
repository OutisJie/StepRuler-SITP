import React from 'react';
import Profile from './Profile'
import concactData  from './mock/concact.json'

export default class MEIndex extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Profile {...concactData}/>
    )
  }
}
