import React from 'react'

import { View, FlatList, DeviceEventEmitter } from 'react-native'
import styleUtil from '../../../config/style'
import LoadingMore from '../../../components/load/LoadingMore'
import NavigatorPage from '../../../components/NavigatorPage'
import TopicItem from './TopicItem'
import toast from '../../../common/toast'
import {data} from '../../sample'

export default class TopicList extends NavigatorPage {
  static defaultProps = {
    ...NavigatorPage.navigatorStyle,
    navBarHidden: true
  }

  static fetchNewTopicWithRefreshing = () => {
    DeviceEventEmitter.emit('fetchNewTopicWithRefreshing')
  }

  static removeTopicWithUserId = (val) => {
    DeviceEventEmitter.emit('removeTopicWithUserId', val)
  }

  constructor(props) {
    super(props)
    this.page = 1
    this.total = 1
    this._isMounted = false
    this.state = {
      user: props.user,
      list: data,
      isLoading: false, //上拉加载
      isRefreshing: false, //下拉刷新
    }
  }

  componentWillreceiveprops() {
    
  }

  componentDidMount() {
    this._isMounted = true
    this._fetchDataWithLoading()
    DeviceEventEmitter.addListener('fetchNewTopicWithRefreshing', this.fetchNewTopicWithRefreshing)
    DeviceEventEmitter.addListener('removeTopicWithUserId', v => this.removeTopicWithUserId(v))
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('fetchNewTopicWithRefreshing')
    DeviceEventEmitter.removeAllListeners('removeTopicWithUserId')
  }

  removeTopicWithUserId = userId => {
    if (this._isMounted) {
      let list = [...this.state.list]
      list = list.filter(item => item.user._id !== userId)
      this.setState({ list })
    }
  }

  _fetchDataWithLoading = () => {
    this.setState({
      isLoading: true
    })
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 1500)
    if (this.props.tabLabel === '热门') {
      this.setState({list: data})
    } else {
      this.setState({list: data.slice(10, 20)})
    }
    let uri = this.props.uri
    console.warn("get data:", uri)
  }

  fetchNewTopicWithRefreshing = () => {
    if (this.props.activeIndex === 0 && this.props.leftHidden) {
      this._fetchDataWithRefreshing()
    }
  }

  _fetchDataWithRefreshing = () => {
    this.setState({
      isRefreshing: true
    })
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
        list: data.slice(5, 15)
      })
    }, 1500)
    let uri = this.props.uri
    let list = this.state.list
    let lastCreatedAt = list.length > 0 ? list[0].createdAt : undefined
    console.warn('loading:', this.state)
  }

  compareList = (oldList, newList) => {
    let obj = {}
    let arr = []
    newList.forEach((v, i) => {
      if (!obj[v.id]) {
        obj[v.id] = v
        arr.push(v)
      }
    })
    oldList.forEach((v, i) => {
      if (obj[v.id]) {
        oldList[i] = obj[v.id]
      }
      if (!obj[v.id]) {
        obj[v.id] = 1
        arr.push(v)
      }
    })
    // console.log(list.length, arr.length)
    if (oldList.length === arr.length) {
      toast.message('没有更多了')
      this.setState({
        isRefreshing: false
      })
    } else {
      this.setState({
        isRefreshing: false,
        list: arr
      })
    }
  }

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
  }

  removeTopic = topicId => {
    this.deleteRow(topicId)
    console.warn("remove:", topicId)
  }

  deleteRow = (topicId) => {
    let list = [...this.state.list]
    let index = list.findIndex(item => item.id === topicId)
    if (index > -1) {
      this.total -= 1
      list.splice(index, 1)
      this.setState({ list })
    }
  }

  _renderRows = ({ item, separators, index }) => {
    return (
      <TopicItem
        navigation={this.props.navigation}
        item={item}
        removeTopic={this.removeTopic}
        deleteRow={this.deleteRow}
        profileUser={this.props.profileUser}
        isViewable={item.isViewable}
      />
    )
  }

  _onViewableItemsChanged = ({ viewableItems, changed }) => {
    let list = [...this.state.list]
    viewableItems.forEach((v, i) => {
      if (list[v.index].id === v.item.id) {
        list[v.index].isViewable = v.isViewable
      }
    })
    changed.forEach((v, i) => {
      if (list[v.index].id === v.item.id) {
        list[v.index].isViewable = v.isViewable
      }
    })
    this.setState({ list })
  }

  renderPage() {
    return (
      <View style={styleUtil.container}>
        <FlatList
          data={this.state.list}
          // extraData={this.state}
          renderItem={this._renderRows}
          initialNumToRender={10}
          keyExtractor={(item, index) => index.toString()}
          // ItemSeparatorComponent={this._itemSeparator}
          // ListEmptyComponent={}
          onEndReached={this._fetchMoreData}
          onEndReachedThreshold={0.3}
          onRefresh={this._fetchDataWithRefreshing}
          refreshing={this.state.isRefreshing}
          ListFooterComponent={this._renderFooter}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={this._onViewableItemsChanged}
        />
      </View>
    )
  }
}

// const styles = StyleSheet.create({})