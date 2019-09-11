import React from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, RefreshControl} from "react-native";
import { Icon } from "react-native-elements";
import moment from "moment";

import Base from "../components/Base";
import Button from "../components/Button";
import BottomNav from "../components/BottomNav";

class Events extends React.Component {
  constructor(props){
    super(props);

    this.state={
      events: [],
      loading: true,
      refreshing: false
    }
  }

  async callAPI() {
    const eventsCall = await fetch('http://caroline.dyn.wpi.edu:1337/events');
    const events = await eventsCall.json();
    console.log(events)
    this.setState({events: events, loading: false})
  }

  async componentDidMount() {
    try {
      await this.callAPI()
    }
    catch(err){
      console.log(err);
      this.setState({loading: false})
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.callAPI().then(() => {
      this.setState({refreshing: false})
    })
  }

  renderItem(data){
    let item = data.item
    console.log(item.date);
    if(item.date)
      formatted_date = moment(item.date, "YYYY-MM-DD HH:mm:ss").format('MMMM Do YYYY, h:mm a')
    else
      formatted_date = null;
    
    if(item.photo) {
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
            source={{uri: "http://caroline.dyn.wpi.edu:1337" + item.photo.url}}
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

  renderItems() {
    const {events, loading} = this.state
    if(loading)
      return (<ActivityIndicator/>);
    return (<FlatList data={events} renderItem={this.renderItem} keyExtractor={(item) => String(item.id)}
      refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}
    />);
  }

  render() {
    const {events, loading} = this.state;
    return (
      <Base>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "center"
          }}
          marginHorizontal="10%"
        >
          <Icon
            type="material-community"
            name="calendar-text"
            size={60}
            color="#2e466c"
            style={{ flex: 1.5 }}
          />
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "rgba(46,70,108,1)",
              width: "100%",
              textAlign: "center",
              flex: .5
            }}
          >
            Local Events
          </Text>
        </View>
        <View
          style={{
            flex: 6,
            marginHorizontal: "5%",
            marginVertical: 20,
            justifyContent: "space-between"
          }}
        >
          {this.renderItems()}
        </View>
        <BottomNav
          onBack={() => this.props.navigation.navigate("Home")}
          onHome={() => this.props.navigation.navigate("Home")}
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
