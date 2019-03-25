import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

const Colors = {
  red: '#FF3B30',
  orange: '#FF9500',
  yellow: '#FFCC00',
  green: '#4CD964',
  tealBlue: '#5AC8FA',
  blue: '#007AFF',
  purple: '#5856D6',
  pink: '#FF2D55',

  white: '#FFFFFF',
  customGray: '#EFEFF4',
  lightGray: '#E5E5EA',
  lightGray2: '#D1D1D6',
  midGray: '#C7C7CC',
  gray: '#8E8E93',
  black: '#000000',
}

const styles = StyleSheet.create({
  centerRow: {
    alignItems: 'flex-start',
    backgroundColor: Colors.blue,
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  container: {
    backgroundColor: Colors.blue,
    borderBottomWidth: 0,
    elevation: 0,
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center',
    left: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 30,
    position: 'absolute',
    right: 0,
    zIndex: 100,
  },
  icon: {
    justifyContent: 'flex-start',
    marginTop: 2.8,
  },
  iconContainer: {
    alignSelf: 'center',
  },
  leftRow: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightRow: {
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 4,
  },
  titleText: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '600',
    marginTop: 2.8,

  },
  subTitleText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '400',
  },
})

class Nav extends Component {
  static propTypes = {
    // navigation: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
  }

  state = {
    like: false,
  }

  onPressLike = () => {
    this.setState(state => ({
      like: !state.like,
    }))
  }

  render() {
    const { navigation, title, subTitle } = this.props

    return (
      <View>
        <View style={styles.container}>
          <View style={styles.leftRow}>
            <Icon
              size={34}
              name="arrow-back"
              type="material-icon"
              onPress={() => navigation.navigate('Main', {})}
              color={Colors.white}
              iconStyle={styles.icon}
              underlayColor="transparent"
              underlineColorAndroid="transparent"
              containerStyle={styles.iconContainer}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            />
          </View>
          <View style={styles.centerRow}>
            <Text style={styles.titleText} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.subTitleText} numberOfLines={1}>
              {subTitle}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

export default Nav
