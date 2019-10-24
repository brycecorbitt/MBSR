import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  RefreshControl,
} from 'react-native';
import {Icon} from 'react-native-elements';
import moment from 'moment';

import API from '../API';
import Base from './Base';
import Button from './Button';
import BottomNav from './BottomNav';

/* 
Required props for ContentFeed components:
  title: title of screen
  icon: icon name for title
  endpoint: API path to endpoint content (e.g "events")
  renderItem(data): a template for rendering each item in the feed
*/

class ContentFeed extends React.Component {
  constructor(props) {
    super(props);

    // Default page size
    this.props.page_size = props.page_size || 10;
    this.state = {
      entries: [],
      current_page: 0,
      loading: true,
      refreshing: false,
    };
  }

  async callAPI() {
    let {current_page} = this.state;
    const entries = API.get_page(
      this.props.endpoint,
      this.props.page_size,
      current_page,
    );
    this.setState({entries: entries, loading: false});
  }

  async componentDidMount() {
    try {
      await this.callAPI();
    } catch (err) {
      console.log(err);
      this.setState({loading: false});
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true, current_page: 0});
    this.callAPI().then(() => {
      this.setState({refreshing: false});
    });
  };

  _onScrollEndDrag = () => {
    let {current_page} = this.state;
    this.setState({current_page: current_page + 1});
    this.callAPI();
  };

  renderItem(data) {
    let item = data.item;
    if (item.date)
      formatted_date = moment(item.date, 'YYYY-MM-DD HH:mm:ss').format(
        'MMMM Do YYYY, h:mm a',
      );
    else formatted_date = null;

    if (item.photo) {
      return (
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{flexDirection: 'column', flex: 3}}>
            <Text style={[styles.Text, styles.EventTitle]}>{item.title}</Text>
            <Text style={[styles.Text, styles.EventDate]}>
              {formatted_date}
            </Text>
            <Text style={[styles.Text, styles.EventLocation]}>
              {item.location}
            </Text>
            <Text style={[styles.Text, styles.EventDescription]}>
              {item.description}
            </Text>
          </View>
          <Image
            style={{flex: 1, resizeMode: 'contain', marginLeft: 20}}
            source={{uri: 'http://caroline.dyn.wpi.edu:1337' + item.photo.url}}
          />
        </View>
      );
    }

    return (
      <View style={{flexDirection: 'column', marginBottom: 10}}>
        <Text style={[styles.Text, styles.EventTitle]}>{item.title}</Text>
        <Text style={[styles.Text, styles.EventDate]}>{formatted_date}</Text>
        <Text style={[styles.Text, styles.EventLocation]}>{item.location}</Text>
        <Text style={[styles.Text, styles.EventDescription]}>
          {item.description}
        </Text>
      </View>
    );
  }

  renderItems() {
    const {entries, loading} = this.state;
    if (loading) return <ActivityIndicator />;
    return (
      <FlatList
        data={entries}
        renderItem={this.props.renderItem}
        keyExtractor={item => String(item.id)}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            onScrollEndDrag={this._onScrollEndDrag}
          />
        }
      />
    );
  }

  render() {
    get_icon = () => {
      if(this.props.icon) {
        return (<Icon
          type="material-community"
          name="calendar-text"
          size={60}
          color="#2e466c"
          style={{flex: 1.5}}
        />);
      }
      return null;
    }
    const {entries, loading} = this.state;
    return (
      <Base>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          marginHorizontal="10%">
          {get_icon()}
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: 'rgba(46,70,108,1)',
              width: '100%',
              textAlign: 'center',
              flex: 0.5,
            }}>
            ${this.props.title}
          </Text>
        </View>
        <View
          style={{
            flex: 6,
            marginHorizontal: '5%',
            marginVertical: 20,
            justifyContent: 'space-between',
          }}>
          {this.renderItems()}
        </View>
        <BottomNav
          onBack={() => this.props.navigation.navigate('Home')}
          onHome={() => this.props.navigation.navigate('Home')}
        />
      </Base>
    );
  }
}

const styles = StyleSheet.create({
  Text: {
    color: 'rgba(46,70,108,1)',
  },
  EventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  EventDate: {
    fontWeight: 'bold',
  },
  EventLocation: {
    fontStyle: 'italic',
  },
  EventDescription: {
    fontSize: 12,
  },
});

export default ContentFeed;
