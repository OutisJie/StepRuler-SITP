import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Font } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { NavigationActions } from 'react-navigation';

import Color from '../../config/style'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../../../assets/images/bg_screen1.jpg');

const goRegisterAction = NavigationActions.navigate({
  routeName: 'Register',
  params: {},
  // action: NavigationActions.navigate({ routeName: 'SubProfileRoute' }),
});

const goHomeAction = NavigationActions.navigate({
  routeName: 'Main',
  params: {}
})
// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class LoginScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      email: '',
      email_valid: true,
      password: '',
      login_failed: false,
      showLoading: false,
      isPasswordValid: true,
      isConfirmationValid: true,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      georgia: require('../../../assets/fonts/Georgia.ttf'),
      regular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
      light: require('../../../assets/fonts/Montserrat-Light.ttf'),
      bold: require('../../../assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  submitLoginCredentials() {
    const { showLoading } = this.state;

    this.setState({
      showLoading: !showLoading,
    });
  }

  login = () =>  {
    const { email, password } = this.state;
    this.setState({
      showLoading: true ,
      email_valid: this.validateEmail(email) || this.emailInput.shake(),
      isPasswordValid: password.length >= 6 || this.passwordInput.shake(),
    });
    // Simulate an API call
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        showLoading: false,
        isConfirmationValid: ((email === '111@qq.com' && password === '123456') && this.goHome()) || this.passwordInput.shake()
      });
    }, 1500);
    
  }

  goRegister = () => {
    this.props.navigation.dispatch(goRegisterAction);
  }

  goHome = () => {
    this.props.navigation.dispatch(goHomeAction)
  }

  render() {
    const { email, password, email_valid, showLoading, isPasswordValid, isConfirmationValid } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          {this.state.fontLoaded ? (
            <View style={styles.loginView}>
              <View style={styles.loginTitle}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.travelText}>TRAVEL</Text>
                  <Text style={styles.plusText}>+</Text>
                </View>
                <View style={{ marginTop: -10 }}>
                  <Text style={styles.travelText}>StepRuler</Text>
                </View>
              </View>
              <View style={styles.loginInput}>
                <Input
                  leftIcon={
                    <Icon
                      name="envelope-o"
                      color="rgba(171, 189, 219, 1)"
                      size={25}
                    />
                  }
                  containerStyle={{ marginVertical: 10 }}
                  onChangeText={email => this.setState({ email })}
                  value={email}
                  inputStyle={{ marginLeft: 10, color: 'white' }}
                  keyboardAppearance="light"
                  placeholder="Email"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  ref={input => (this.emailInput = input)}
                  onSubmitEditing={() => {
                    this.setState({ email_valid: this.validateEmail(email) });
                    this.passwordInput.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Color.grey4}
                  errorMessage={
                    email_valid ? null : '请输入有效的email'
                  }
                />
                <Input
                  leftIcon={
                    <SimpleIcon
                      name="lock"
                      color="rgba(171, 189, 219, 1)"
                      size={25}
                    />
                  }
                  containerStyle={{ marginVertical: 10 }}
                  inputStyle={{ marginLeft: 10, color: 'white' }}
                  secureTextEntry={true}
                  blurOnSubmit={true}
                  autoCorrect={false}
                  placeholderTextColor={Color.grey4}
                  keyboardAppearance="light"
                  placeholder="Password"
                  autoCapitalize="none"
                  keyboardType="default"
                  returnKeyType="done"
                  value={password}
                  ref={input => (this.passwordInput = input)}
                  onSubmitEditing={() => 
                    this.login
                  }
                  onChangeText={password => this.setState({ password })}
                  errorMessage={!isPasswordValid && '清楚入至少6个字符' || (!isConfirmationValid && '账号或密码错误' || null)}
                />
              </View>
              <Button
                title="登 录"
                activeOpacity={1}
                underlayColor="transparent"
                onPress={this.login}
                loading={showLoading}
                loadingProps={{ size: 'small', color: 'white' }}
                disabled={showLoading}
                buttonStyle={{
                  height: 50,
                  width: 250,
                  backgroundColor: 'transparent',
                  borderWidth: 2,
                  borderColor: Color.primary2,
                  borderRadius: 30,
                  marginTop: 20
                }}
                disabledStyle={{
                  backgroundColor: 'transparent',
                  borderColor: Color.grey1,
                }}
                containerStyle={{ marginVertical: 10 }}
                titleStyle={{ fontWeight: 'bold', color: Color.primary2 }}
              />
              <View style={styles.footerView}>
                <Text style={{ color: Color.grey3 }}>没有账号?</Text>
              </View>
              <Button
                title="注 册"
                activeOpacity={1}
                underlayColor="transparent"
                onPress={this.goRegister}
                buttonStyle={{
                  height: 50,
                  width: 250,
                  backgroundColor: 'transparent',
                  borderWidth: 2,
                  borderColor: Color.grey2,
                  borderRadius: 30,
                }}
                containerStyle={{ marginVertical: 10 }}
                titleStyle={{ fontWeight: 'bold', color: Color.grey4 }}
              />
            </View>
          ) : (
            <Text>Loading...</Text>
          )}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginView: {
    marginTop: 150,
    backgroundColor: 'transparent',
    width: 250,
    height: 400,
  },
  loginTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  travelText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'bold',
  },
  plusText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular',
  },
  loginInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
