import React from "react";
import { View, Text, StyleSheet} from "react-native";
import { Icon } from "react-native-elements"

import API from "../API";
import VideoPlayer from '../components/VideoPlayer'
import ContentFeed from "../components/ContentFeed";
import Base from "../components/Base";
import BottomNav from "../components/BottomNav";

class VideoExercises extends React.Component {
  constructor(props){
    super(props)
  }

  renderItem(data){
    let item = data.item;
    let url = API.convert_file_url(item.source.url);
      return (
        <View style={{flexDirection: "row", marginBottom: 10}}>
          <View style={styles.entry}>
            <Text style={styles.VideoTitle}>{item.title}</Text>
              <VideoPlayer source={{uri: url}}/>
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
        <ContentFeed endpoint="/content/video_ex" renderItem={this.renderItem} navigator={this.props.navigation}/>
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
