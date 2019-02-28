import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';

import Login from './screens/login';
import Register from './screens/register';
import AppNavigator from './navigation'


const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = props => (
  <View style={{ flex: 1, backgroundColor: '#43484d' }}>
    <View
      style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}
    >
      <Image
        source={require('../assets/images/logo.png')}
        style={{ width: SCREEN_WIDTH * 0.57 }}
        resizeMode="contain"
      />
    </View>
    <View style={{ marginLeft: 10 }}>
      <DrawerItems {...props} />
    </View>
  </View>
);

export default createAppContainer(createDrawerNavigator(
  {
    Login: {
      path: '/login',
      screen: Login,
    },
    Register: {
      path: '/register',
      screen: Register
    },
    Main: {
      path: '/main',
      screen: AppNavigator
    }
  },
  {
    initialRouteName: 'Main',
    contentOptions: {
      activeTintColor: '#548ff7',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: '#ffffff',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        fontSize: 15,
        marginLeft: 0,
      },
    },
    drawerWidth: SCREEN_WIDTH * 0.8,
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
));