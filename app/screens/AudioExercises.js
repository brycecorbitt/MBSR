import React from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, RefreshControl} from "react-native";
import { Icon } from "react-native-elements";
import { WebView } from "react-native-webview";

import API from "../API";
import ContentFeed from "../components/ContentFeed";
import Base from "../components/Base";
import BottomNav from "../components/BottomNav";

class AudioExercises extends React.Component {

  renderItem(data){
    let item = data.item;
    let url = API.convert_file_url(item.source.url);
    
      return (
        <View style={{flexDirection: "row", marginBottom: 10}}>
          <View>
            <Text style={styles.AudioTitle}>{item.title}</Text>
            {/* <AudioPlayer url={url}/> */}
            <WebView
              source={{html: `<audio style="width:50%; height: 50;"
              controls
              src="${url}">
                  Your browser does not support the
                  <code>audio</code> element.
          </audio>`}}
              containerStyle={{width: 500, minHeight: 50, backgroundColor: "transparent"}}
              style={{width: "100%", height: "200%", backgroundColor: "transparent"}}
            />
          </View>
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
          name="volume-high"
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
            Audio Exercises
          </Text>
        </View>
        <ContentFeed endpoint="/content/audio_ex" renderItem={this.renderItem}></ContentFeed>
        <BottomNav
          onBack={() => this.props.navigation.navigate('Exercises')}
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
  AudioTitle: {
    fontSize: 20,
    fontWeight: "bold",
    width: "100%"
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

export default AudioExercises;
