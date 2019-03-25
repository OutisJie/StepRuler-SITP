import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Home from '../screens/home';
import Friend from '../screens/friend'
import Schedule from '../screens/schedule'
import MapIndex from '../screens/map'
import MEIndex from '../screens/me'

const HomeStack = createStackNavigator({
  Home: Home,
});

HomeStack.navigationOptions = {
  tabBarLabel: '主页',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  )
};

const FriendStack = createStackNavigator({
  Friend: Friend
})

FriendStack.navigationOptions = {
  tabBarLabel: '朋友',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contacts' : 'md-contacts'}
    />
  )
}

const ScheduleStack = createStackNavigator({
  Schedule: Schedule
})

ScheduleStack.navigationOptions = {
  tabBarLabel: '日程',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-calendar':'md-calendar'}
    />
  )
}

const MapStack = createStackNavigator({
  MapIndex: MapIndex,
});

MapStack.navigationOptions = {
  tabBarLabel: '地图',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-navigate' : 'md-navigate'}
    />
  ),
};

const MEStack = createStackNavigator({
  MEIndex: MEIndex
})

MEStack.navigationOptions = {
  tabBarLabel: '个人',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      } />
  )
}

export default createBottomTabNavigator({
  HomeStack,
  FriendStack,
  ScheduleStack,
  MapStack,
  MEStack
});
