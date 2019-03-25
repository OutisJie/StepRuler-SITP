import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import data from '../../global'
import Toast from 'teaset/components/Toast/Toast';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      status: false
    };
  }

  componentDidMount(){
    this.setState({
      status: data.status
    })
  }


  render() {
    return (
      <Agenda
        fresh={this.props.fresh}
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2019-03-19'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        onDaychange={this.loadItems.bind(this)}
        onDayPress={this.loadItems.bind(this)}
      // markingType={'period'}
      // markedDates={{
      //    '2017-05-08': {textColor: '#666'},
      //    '2017-05-09': {textColor: '#666'},
      //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
      //    '2017-05-21': {startingDay: true, color: 'blue'},
      //    '2017-05-22': {endingDay: true, color: 'gray'},
      //    '2017-05-24': {startingDay: true, color: 'gray'},
      //    '2017-05-25': {color: 'gray'},
      //    '2017-05-26': {endingDay: true, color: 'gray'}}}
      // monthFormat={'yyyy'}
      // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
      //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          if (strTime === '2019-03-20' && data.status) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            })
          } else {
            for (let j = 0; j < numItems; j++) {
              this.state.items[strTime].push({
                name: 'Item for ' + strTime,
                height: Math.max(50, Math.floor(Math.random() * 150))
              });
            }
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  onPress=()=>{
  }
  renderItem(item) {
    if (item.name === 'Item for 2019-03-20' && data.status) {
      item = data
      return (
        <View style={[styles.item, { height: item.height }]}>
          <Text style={styles.descriptionText}>名称：{item.name}</Text>
          <Text style={styles.descriptionText}>类型：{item.type}</Text>
          <Text style={styles.descriptionText}>地点：{item.address}</Text>
          <Text style={styles.descriptionText}>人数：{item.people}</Text>
          <Text style={styles.descriptionText}>时长：{item.days}</Text>

          <View>
            <Text style={styles.priceText}>【个人必需物品】</Text>
            <Text style={styles.descriptionText}>{item.tips1}
            </Text>
          </View>
          <View>
            <Text style={styles.priceText}>【个人建议装备】</Text>
            <Text style={styles.descriptionText}>{item.tips2}
            </Text>
          </View>
        </View>

      );
    }
    return <View style={[styles.item, { height: item.height }]}>
      <TouchableOpacity onPress={this.onPress}>

        <Text style={styles.descriptionText}>{''}</Text>
      </TouchableOpacity>

    </View>
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  
}
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
  priceText: {
    marginBottom: 5,
    letterSpacing: 1,

    color: Colors.black,
    fontSize: 24,
    fontWeight: '400',
  },
  detailText: {
    marginBottom: 4,
    color: Colors.black,
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  subDetailText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '100',
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  descriptionText: {
    marginBottom: 4,
    color: Colors.gray,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});