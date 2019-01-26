import React, { Component } from 'react'
import { Platform, View, TouchableOpacity, Text } from 'react-native'
import Auth0 from 'react-native-auth0'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { apply } from '../../theme/styles'
import { colors } from '../../theme/config'
import { saveKey } from '../utils/db'

var credentials = {
  clientId: 'QebTak8GxYGnpnK4_4sT3Pie6vOy8GCg',
  domain: 'hasura-demo.auth0.com'
}
const auth0 = new Auth0(credentials)

export default class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accessToken: null,
      userId: null
    }
  }

  componentDidMount() {}

  _onLogin = () => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile',
        audience: 'https://' + credentials.domain + '/userinfo'
      })
      .then(credentials => {
        auth0.auth
          .userInfo({ token: credentials.accessToken })
          .then(user => saveKey(user.sub))
      })
      .catch(error => console.log(error))
  }

  _onLogout = () => {
    if (Platform.OS === 'android') {
      this.setState({ accessToken: null })
    } else {
      auth0.webAuth
        .clearSession({})
        .then(success => {
          this.setState({ accessToken: null })
        })
        .catch(error => console.log(error))
    }
  }

  render() {
    return (
      <View style={apply('bg-blue flex-1 justify-center items-center')}>
        <View>
          <Text style={apply('text-white text-4xl italic font-semibold mb-10')}>
            BinTweet
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={apply(
              'bg-white shadow-lg rounded-full border p-4 self-center'
            )}
            onPress={this._onLogin}
          >
            <Icon name={'login-variant'} color={colors.blue} size={32} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
