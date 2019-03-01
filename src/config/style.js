import { Theme } from 'teaset'
import { Dimensions } from 'react-native'
const THEME_COLOR = '#5bc0de';//393E42, 3988BD,4F94CD
const BACKGROUND_COLOR = '#F9F9F9';

export default {
  primary: '#397af8',
  primary1: '#4d86f7',
  primary2: '#6296f9',
  secondary: '#8F0CE8',
  secondary2: '#00B233',
  secondary3: '#00FF48',
  grey1: '#43484d',
  grey2: '#5e6977',
  grey3: '#86939e',
  grey4: '#bdc6cf',
  grey5: '#e1e8ee',
  dkGreyBg: '#232323',
  greyOutline: '#cbd2d9',
  tintColor: '#548ff7',
  tabIconDefault: '#ccc',
  tabIconSelected: '#548ff7',
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#FF0000',
  noticeBackground: '#548ff7',
  noticeText: '#fff',
  activeTextColor: '#000',
  inactiveTextColor: '#666',
  borderColor: '#CCC',
  successColor: '#32CD32',
  borderSeparator: Theme.tvBarSeparatorWidth,
  backgroundColor: BACKGROUND_COLOR,
  themeColor: THEME_COLOR,
  underlineStyle: {
    backgroundColor: THEME_COLOR,
    bottom: 5,
    height: 3,
    // width: 40,
  },
  window: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	},
};
