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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      loading: false,
      username: '',
      password: '',
    };
  }

  loadingRender() {
    let {loading} = this.state;
    if (loading) return <ActivityIndicator size="large"/>;
    return null;
  }

  _submit_login() {
    let {username, password} = this.state;
    this.setState({loading: true});
    API.login(username, password).then(res => {
      this.setState({loading: false});
      if(res.error)
        DropDownHolder.throwError(res.error);
      else
        this.props.navigation.navigate('Account');
    });

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
            Login
          </Text>
        </View>
        <View
          style={{
            flex: 5,
            marginHorizontal: '5%',
            marginVertical: 20,
            justifyContent: 'flex-start',
          }}>
          <Text style={styles.textInputHeader}>Email or Username</Text>
          <TextInput
            style={styles.TextInput}
            value={this.state.username}
            autoCapitalize="none"
            onChangeText={(text) => this.setState({username: text})}
          />
          <Text style={styles.textInputHeader}>Password</Text>
          <TextInput
            style={styles.TextInput}result
            value={this.state.password}
            textContentType="password"
            secureTextEntry
            onChangeText={(text) => this.setState({password: text})}
          />
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View style={{alignContent: 'stretch', flex: 1}}>
              <Button secondary title="Submit" onPress={() => this._submit_login()} />
            </View>
            <View style={{flex: 1}}>
              {this.loadingRender()}
            </View>
          </View>
        </View>

        <BottomNav
          onBack={() => this.props.navigation.navigate('Settings')}
          onHome={() => this.props.navigation.navigate('Home')}
        />
      </Base>
    );
  }
}

const styles = StyleSheet.create({
  TextInputHeader: {
    color: 'rgba(46,70,108,1)',
    fontSize: 28
  },
  TextInput: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
export default Login;
