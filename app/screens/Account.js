import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';

import Base from '../components/Base';
import Button from '../components/Button';
import BottomNav from '../components/BottomNav';
import DropDownHolder from '../DropDownHolder';
import API from '../API';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      user: API.get_user()
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({user: API.get_user()});
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  async logout() {
    API.logout().then(res => {
      if(res.error)
        DropDownHolder.throwError(res.error);
      else
        this.props.navigation.navigate('Home');
    })
  }

  render_user() {
    let {user} = this.state;
    return <View style={{marginVertical: 20}}>
      <Text style={styles.TextHeader}>First Name: <Text style={styles.Text}>{user.first_name}</Text></Text>
      <Text style={styles.TextHeader}>Last Name: <Text style={styles.Text}>{user.last_name}</Text></Text>
      <Text style={styles.TextHeader}>Email Address: <Text style={styles.Text}>{user.email}</Text></Text>
      <Text style={styles.TextHeader}>Username: <Text style={styles.Text}>{user.username}</Text></Text>
    </View>;
    

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
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: 'rgba(46,70,108,1)',
              width: '100%',
              textAlign: 'center',
              flex: 1,
            }}>
            My Account
          </Text>
        </View>
        <View
          style={{
            flex: 5,
            marginHorizontal: '5%',
            marginVertical: 20,
            justifyContent: 'flex-start',
          }}>
          {this.render_user()}
          <Button secondary title="Logout" onPress={() => this.logout()}/>
        </View>

        <BottomNav
          onBack={() => this.props.navigation.goBack()}
          onHome={() => this.props.navigation.navigate('Home')}
        />
      </Base>
    );
  }
}

const styles = StyleSheet.create({
  TextHeader: {
    color: 'rgba(46,70,108,1)',
    fontSize: 20
  },
  Text: {
    fontWeight: "bold",
    color: "rgba(46,70,108,1)",
    fontSize: 20
  },
});
export default Account;
