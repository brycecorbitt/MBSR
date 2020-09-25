import React from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, RefreshControl} from "react-native";
import { WebView } from "react-native-webview";
import { Icon } from "react-native-elements";

import API from "../API";
import VideoPlayer from '../components/VideoPlayer'
import ContentFeed from "../components/ContentFeed";
import Base from "../components/Base";
import BottomNav from "../components/BottomNav";

class VideoExercises extends React.Component {

  renderItem(data){
    let item = data.item;
    let url = API.convert_file_url(item.source.url);
      return (
        <View style={{flexDirection: "row", marginBottom: 10}}>
          <View style={styles.entry}>
            <Text style={styles.VideoTitle}>{item.title}</Text>
            {/* <WebView
              originWhitelist={['*']}
              mediaPlaybackRequiresUserAction={true}
              allowsFullscreenVideo={true}
              useWebkit
              // source={{uri: url}}\
              source={{html: `
              <video width="100%" height="100%" style="background-color:transparent; overflow: hidden;" controls>
                  <source src="${url}">
              </video`}}
              style={{backgroundColor: "black", overflow: "hidden"}}
              containerStyle={{ flex: 0, marginTop: 20, height: 200, overflow: "hidden", backgroundColor: "transparent"}}
              scrollEnabled={false}
              overScrollMode={"never"}
              onError={function(e){console.log(e)}}
              // source={{html: `<video src="${url}">`}}
            /> */}
            <VideoPlayer
              source={{uri: url}}
              // navigator={global.navigator}
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
          name="library-video"
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
            Video Exercises
          </Text>
        </View>
        <ContentFeed endpoint="/content/video_ex" renderItem={this.renderItem} navigator={this.props.navigation}></ContentFeed>
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
  VideoTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  entry: {
    marginVertical: 20,
    width: "100%"
  }

})

export default VideoExercises;
