import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

// @monte9
import LoginScreen1 from './screen1';

export default class Login extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal pagingEnabled decelerationRate={0.993}>
          <LoginScreen1 navigation={this.props.navigation}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
