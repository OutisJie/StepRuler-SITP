import React from 'react'
import { StyleSheet, Text, View, FlatList, DeviceEventEmitter, Alert, Animated, InteractionManager } from 'react-native'
import { Image } from 'react-native-elements'
import styleUtil from '../../config/style'
import LoadingMore from '../../components/load/LoadingMore'
import Separator from '../../components/Seperator'

import DynamicItem from './components/PyqItem'
import PyqDetail from './PyqDetail'
import { ActionPopover, Button, PullPicker } from 'teaset'
import utils from '../../common/utils'
import NavigatorPage from '../../components/NavigatorPage'
import PyqList from './data/pyq.json'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class PyqScreen extends NavigatorPage {
	static defaultProps = {
		navBarHidden: true,
	};

	static listenerDynamicMsg = () => {
		DeviceEventEmitter.emit('listenerDynamicMsg')
	};

	static fetchDynamicWithRefreshing = () => {
		DeviceEventEmitter.emit('fetchDynamicWithRefreshing')
	};

	static removeDynamicWithUserId = (val) => {
		DeviceEventEmitter.emit('removeDynamicWithUserId', val)
	};

	constructor(props) {
		super(props);
		this.page = 1;
		this.total = 1;
		this.state = {
			user: props.user,
			list: PyqList,
			isLoading: false, //上拉加载
			isRefreshing: false, //下拉刷新
			dynamicMsgList: []
		}
	}

	componentDidMount() {
		this._isMounted = true;
		DeviceEventEmitter.addListener('fetchDynamicWithRefreshing', this.fetchDataWithRefreshing)
		DeviceEventEmitter.addListener('removeDynamicWithUserId', v => this.removeDynamicWithUserId(v))
		this.setState({ isLoading: true })
		InteractionManager.runAfterInteractions(() => {
			this._fetchDataWithLoading();
		})
	}

	componentWillUnmount() {
		this._isMounted = false;
		DeviceEventEmitter.removeAllListeners('fetchDynamicWithRefreshing')
		DeviceEventEmitter.removeAllListeners('removeDynamicWithUserId')
	}

	removeDynamicWithUserId = userId => {
		if (this._isMounted) {
			let list = [...this.state.list];
			list = list.filter(item => item.user._id !== userId);
			this.setState({ list })
		}
	};

	getDynamicMsg = () => {
		if (this.props.visibleType === 1) {

		}
	};

	listenerDynamicMsg = () => {
		//获取新的动态消息
		imessage
			.onDynamicMsgReceive(res => {
				if (res.code !== 0) return;
			})
	};

	_itemSeparator = () => {
		return (
			<Separator />
		)
	};

	goToDynamicDetail = (item) => {
		
	};

	_renderDynamicMsg = () => {
		let dynamicMsgList = this.state.dynamicMsgList;
		if (dynamicMsgList.length === 0) {
			return null;
		}
		return (
			<Button
				// size={'md'}
				style={{
					position: 'absolute',
					top: 5,
					right: 5,
					zIndex: 99,
					width: 130,
					borderColor: styleUtil.themeColor
				}}
				onPress={_ => {
					let list = [...dynamicMsgList];
					// TabNavBar.updateDynamicBadge(0);
					let tabs = this.props.tabs;
					tabs[2].badgeCount = 0;
					this.props.updateTabs(tabs);
					this.setState({
						dynamicMsgList: []
					});
					// navigate.pushNotNavBar(FriendDynamicMsgList, {
					// 	list,
					// 	onPress: this.goToDynamicDetail
					// })
				}}
			>
				<View style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					{/* <ImageCached
						source={}
						style={{
							width: 30,
							height: 30,
							marginRight: 5
						}}
					/> */}
					<Image style={{
						width: 30,
						height: 30,
						marginRight: 5
					}} />
					<Text style={{
						color: '#c30'
					}}>
						{dynamicMsgList.length > 99 ? '99+' : dynamicMsgList.length}条新消息
					</Text>
				</View>
			</Button>
		)
	};

	removeDynamic = (item, index, callback) => {
		Alert.alert('确认删除吗？', '', [
			{ text: '取消' },
			{
				text: '确定', onPress: _ => {
					this.deleteRow(index);
				}
			},
		])

	};

	deleteRow = index => {
		let list = [...this.state.list];
		this.total -= 1;
		list.splice(index, 1);
		this.setState({ list });
	};


	onReport = row => {
		let items
		PullPicker.show(
			'选择举报类型',
			items,
			undefined,
			(item, index) => {
				if (item === '其他') {
					// navigate.pushNotNavBar(EditTextArea, {
					// 	title: '举报内容',
					// 	maxLength: 100,
					// 	text: '',
					// 	submit: text => this.reportUser({
					// 		id: row.id,
					// 		content: text,
					// 		row
					// 	}, _ => navigate.pop())
					// })
				} else {
					this.reportUser({
						id: row.id,
						content: item,
						row
					})
				}
			}
		);
	};

	reportUser = (item, callback) => {

	};

	onShield = (row, index, callback) => {
		// if (!config.user._id) {
		// 	navigate.push(PhoneLogin);
		// 	return;
		// }
	};

	_renderRows = ({ item, index }) => {
		return (
			<DynamicItem
				navigation={this.props.navigation}
				{...this.props}
				item={item}
				index={index}
				onPress={(row, setItem) => {
				}}
				isViewable={item.isViewable}
				onReport={_ => this.onReport(item)}
				removeDynamic={_ => this.removeDynamic(item, index)}
				deleteRow={_ => this.deleteRow(index)}
				onShield={_ => this.onShield(item, index)}
			/>
		)
	};

	_fetchDataWithLoading = () => {
		this.setState({
      isLoading: true
    })
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 1500)
    let uri = this.props.uri
    console.warn("get data:", uri)
	};

	fetchDataWithRefreshing = () => {
		this.setState({
			isRefreshing: true
		})
		setTimeout(() => {
			this.setState({
				isRefreshing: false
			})
		}, 1500)
		let uri = this.props.uri
		let list = this.state.list
		let lastCreatedAt = list.length > 0 ? list[0].createdAt : undefined
		console.warn('loading:', this.state)
	};

	compareList = (oldList, newList) => {
		let obj = {};
		let arr = [];
		newList.forEach((v, i) => {
			if (!obj[v.id]) {
				obj[v.id] = v;
				arr.push(v);
			}
		});
		oldList.forEach((v, i) => {
			if (obj[v.id]) {
				oldList[i] = obj[v.id]
			}
			if (!obj[v.id]) {
				obj[v.id] = 1;
				arr.push(oldList[i]);
			}
		});
		arr.sort(function (a, b) {
			return b.createdAt - a.createdAt
		});
		// console.log(list.length, arr.length);
		if (oldList.length === arr.length) {
			// toast.message('没有更多了');
			this.setState({
				isRefreshing: false
			})
		} else {
			this.setState({
				isRefreshing: false,
				list: arr
			})
		}
	};

	_hasMore = () => {
		return this.state.list.length < this.total && this.total > 0
	}

	_fetchMoreData = () => {
		if (this._hasMore() && !this.state.isLoading) {
			this._fetchDataWithLoading()
		}
	}

	_renderFooter = () => {
		return <LoadingMore hasMore={this._hasMore()} />
	};

	_onViewableItemsChanged = ({ viewableItems, changed }) => {
		let list = [...this.state.list];
		viewableItems.forEach((v, i) => {
			if (list[v.index].id === v.item.id) {
				list[v.index].isViewable = v.isViewable;
			}
		});
		changed.forEach((v, i) => {
      if (list[v.index].id === v.item.id) {
        list[v.index].isViewable = v.isViewable
      }
    })
		this.setState({ list })
	};

	renderPage() {
		const AnimatedView = this.props.animated ? AnimatedFlatList : FlatList;
		return (
			<View style={styles.container}>
				<AnimatedView
					data={this.state.list}
					renderItem={this._renderRows}
					initialNumToRender={10}
					keyExtractor={(item, index) => index.toString()}
					ItemSeparatorComponent={this._itemSeparator}
					onEndReached={this._fetchMoreData}
					onEndReachedThreshold={0.3}
					onRefresh={this.props.isRefresh ? this.fetchDataWithRefreshing : undefined}
					refreshing={this.props.isRefresh ? this.state.isRefreshing : undefined}
					// ListHeaderComponent={this.props.renderHeaderList}
					ListFooterComponent={this._renderFooter}
					onViewableItemsChanged={this._onViewableItemsChanged}
					// {...this.props}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
    // backgroundColor: '#FF9800'
	}
})