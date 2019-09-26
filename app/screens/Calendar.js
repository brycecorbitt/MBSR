import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import RNLocalNotifications from 'react-native-local-notifications';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import Base from '../components/Base';
import BottomNav from '../components/BottomNav';
import Button from '../components/Button';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: {index: 1, schedules: []},
      picked_date: moment()
        .add(1, 'm')
        .toDate(),
      isDateTimePickerVisible: false,
    };
  }

  addNotification = () => {
    let {notifications, picked_date} = this.state;
    var new_id = notifications.index++;
    notifications.schedules.push({id: new_id, date: picked_date});
    var formatted_date = moment(picked_date).format('YYYY-MM-DD HH:mm');
    RNLocalNotifications.createNotification(
      new_id,
      'Time to be mindful! Scheduled practice reminder',
      formatted_date,
      'default',
    );
    this.setState({notifications: notifications});
  };

  removeNotification(id) {
    let {notifications} = this.state;
    let match = null;
    let i = 0;
    for (i; i < notifications.schedules.length; i++) {
      if (notifications.schedules[i].id == id) {
        match = notifications.schedules[i];
        break;
      }
    }
    if (match) {
      RNLocalNotifications.deleteNotification(id);
      notifications.schedules.splice(i, 1);
      this.setState({notifications: notifications});
    } else console.log(`No notification was found matching the id "${id}"`);
  }

  getSelectedDateTime() {
    let {picked_date} = this.state;
    if (picked_date) return picked_date.toLocaleString('en-US');
  }

  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  handleDatePicked = date => {
    console.log('A date has been picked: ', date);
    this.setState({isDateTimePickerVisible: false, picked_date: date});
    this.addNotification();
  };

  renderNotifications() {
    return (
      <FlatList
        data={this.state.notifications.schedules}
        renderItem={sched => {
          let schedule = sched.item;
          console.log(schedule);
          if (schedule.date < new Date()) return null;
          return (
            <View style={{marginTop: 5}}>
              <Button
                title={schedule.date.toLocaleString()}
                icon={{size: 25, name: 'delete', end: true}}
                onPress={() => this.removeNotification(schedule.id)}
              />
            </View>
          );
        }}
        keyExtractor={item => String(item.id)}
        extraData={this.state}
      />
    );
  }

  render() {
    return (
      <Base>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button
            title="Schedule a Reminder"
            onPress={this.showDateTimePicker}
          />
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
            date={moment()
              .add(1, 'm')
              .toDate()}
            mode="datetime"
          />
          {/* <Button title="Add Reminder" onPress={this.addNotification} /> */}
          <View
            style={{
              marginTop: 40,
              height: '75%',
              width: '80%',
              alignContent: 'center',
            }}>
            {this.renderNotifications()}
          </View>
          <BottomNav
            onBack={() => this.props.navigation.goBack()}
            onHome={() => this.props.navigation.navigate('Home')}
          />
        </View>
      </Base>
    );
  }
}
export default Calendar;
