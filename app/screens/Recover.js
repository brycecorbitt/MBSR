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

class Recover extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      loading: false,
      email: '',
    };
  }

  loadingRender() {
    let {loading} = this.state;
    if (loading) return <ActivityIndicator size="large"/>;
    return null;
  }

  _submit_email() {
    let {email} = this.state;
    this.setState({loading: true});
    API.post("/recover", {email: email}).then(res => {
      this.setState({loading: false});
      if(res.error)
        DropDownHolder.throwError(res.error);
      else {
        DropDownHolder.throwSuccess("You will receive an email shortly to reset your password.");
        this.props.navigation.navigate("Login");
      }
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
            Account Recovery
          </Text>
        </View>
        <View
          style={{
            flex: 5,
            marginHorizontal: '5%',
            marginVertical: 20,
            justifyContent: 'flex-start',
          }}>
          <Text style={styles.textInputHeader}>Email Address of Account</Text>
          <TextInput
            style={styles.TextInput}
            value={this.state.email}
            autoCapitalize="none"
            onChangeText={(text) => this.setState({email: text})}
          />
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View style={{alignContent: 'stretch', flex: 1}}>
              <Button secondary title="Submit" onPress={() => this._submit_email()} />
            </View>
            <View style={{flex: 1}}>
              {this.loadingRender()}
            </View>
          </View>
        </View>

        <BottomNav
          onBack={() => this.props.navigation.navigate('Login')}
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
export default Recover;
