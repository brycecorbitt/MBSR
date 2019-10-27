import React from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, RefreshControl} from "react-native";
import { Icon } from "react-native-elements";
import moment from "moment";

import API from "../API";
import ContentFeed from "../components/ContentFeed";
import Button from "../components/Button";
import Base from "../components/Base";
import BottomNav from "../components/BottomNav";

class Events extends React.Component {

  renderItem(data){
    let item = data.item
    if(item.date)
      formatted_date = moment(item.date, "YYYY-MM-DD HH:mm:ss").format('MMMM Do YYYY, h:mm a')
    else
      formatted_date = null;
    
    if(item.photo) {
      console.log(API.convert_file_url(item.photo.url));
      return (
        <View style={{flexDirection: "row", marginBottom: 10}}>
          <View style={{flexDirection: "column", flex: 3}}>
          <Text style={[styles.Text, styles.EventTitle]}>{item.title}</Text>
          <Text style={[styles.Text, styles.EventDate]}>{formatted_date}</Text>
          <Text style={[styles.Text, styles.EventLocation]}>{item.location}</Text>
          <Text style={[styles.Text, styles.EventDescription]}>{item.description}</Text>
          </View>
          <Image
            style={{ flex: 1, resizeMode: "contain", marginLeft: 20 }}
            source={{uri: API.convert_file_url(item.photo.url)}}
          />
        </View>
      );
    }

    return (
      <View style={{flexDirection: "column", marginBottom: 10}}>
        <Text style={[styles.Text, styles.EventTitle]}>{item.title}</Text>
        <Text style={[styles.Text, styles.EventDate]}>{formatted_date}</Text>
        <Text style={[styles.Text, styles.EventLocation]}>{item.location}</Text>
        <Text style={[styles.Text, styles.EventDescription]}>{item.description}</Text>
      </View>
      
    );
  }

  render() {
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
          <Icon
          type="material-community"
          name="calendar-text"
          size={60}
          color="#2e466c"
          style={{flex: 1.5}}
        />
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: 'rgba(46,70,108,1)',
              width: '100%',
              textAlign: 'center',
              flex: 0.5,
            }}>
            Events
          </Text>
        </View>
        <ContentFeed title="Events" icon="calendar-text" endpoint="/content/events" renderItem={this.renderItem}></ContentFeed>
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
    color: "rgba(46,70,108,1)"
  },
  EventTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  EventDate: {
    fontWeight: "bold"
  },
  EventLocation: {
    fontStyle: "italic"
  },
  EventDescription: {
    fontSize: 12
  }
})

export default Events;
