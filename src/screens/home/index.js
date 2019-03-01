import React from 'react';
import { StyleSheet, Text } from 'react-native';

import styleUtil from '../../config/style';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import TabBar from '../../components/tabbar/TabBar'
import NavigatorPage from '../../components/NavigatorPage';
import NavBar from '../../components/NavBar';
import TopicList from './components/TopicList';

export default class HomeIndex extends NavigatorPage {
	static navigationOptions = {
		header : null
	};
	
	static defaultProps = {
		...NavigatorPage.navigatorStyle,
		title: '热门',
		showBackButton: true,
		navBarHidden: true,
		navigationBarInsets: false,
		leftHidden: true
	};

	constructor(props) {
		super(props);
		this.state = {
			tabs: [
				{ name: '热门', uri: 'Hot' },
				{ name: '关注', uri: 'Follow' }
			],
			activeIndex: 0,
			fromIndex: 0
		}
	}

	onChangeTab = ({ i, ref, from }) => {
		if (this.state.activeIndex !== i) {
			this.setState({
				activeIndex: i,
				fromIndex: from
			});
		}
	};

	renderNavBar = props => {
		return (
			<NavBar
				renderTitleView={
					<TabBar
						backgroundColor={null}
						activeTextColor={styleUtil.activeTextColor}
						fromIndex={this.state.fromIndex}
						inactiveTextColor={styleUtil.inactiveTextColor}
						underlineStyle={styleUtil.underlineStyle}
						tabContainerWidth={210}
						style={{
							width: 210,
							paddingTop: 5,
							borderBottomWidth: 0
						}}
						{...props}
						tabs={this.state.tabs}
					/>
				}
				leftHidden={this.props.leftHidden}
				renderLeftView={this.props.renderLeftView}
				renderRightView={this.props.renderRightView}
			/>
		)
	};

	renderPage() {
		return (
			<ScrollableTabView
				tabBarPosition={'top'}
				renderTabBar={this.renderNavBar}
				onChangeTab={this.onChangeTab}
				initialPage={0}
			>
				{this.state.tabs.map((v, i) => (
					<TopicList
						key={v.name}
						{...this.props}
						tabLabel={v.name}
						uri={v.uri}
						activeIndex={this.state.activeIndex}
						leftHidden={this.props.leftHidden}
						getListType={this.props.getListType}
					/>
				))}
			</ScrollableTabView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: styleUtil.backgroundColor
	},
	label: {
		fontSize: 14,
		fontWeight: '700',
	},
});