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
import DropDownHolder from '../DropDownHolder';
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
    this.page_size = props.page_size || 10;
    this.state = {
      entries: [],
      current_page: 0,
      loading: true,
      refreshing: false,
    };
  }

  async callAPI() {
    let {current_page} = this.state;
    const entries = await API.get_page(
      this.props.endpoint,
      this.page_size,
      current_page,
    );
    if (entries.error) {
      DropDownHolder.throwError(entries.error);
      this.setState({loading: false});
      return;
    }
    this.setState({entries: entries, loading: false});
  }

  async componentDidMount() {
    if (this.state.entries.length)
      return;
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


  renderItems() {
    const {entries, loading} = this.state;
    if (loading) return <ActivityIndicator />;
    if (!entries.length)
      return null;
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
        <View
          style={{
            flex: 6,
            marginHorizontal: '5%',
            marginVertical: 20,
            justifyContent: 'space-between',
          }}>
          {this.renderItems()}
        </View>
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
