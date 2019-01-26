import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Auth0 from 'react-native-auth0'

import { loadKey } from '../utils/db'
import { apply } from '../../theme/styles'
import { colors } from '../../theme/config'
import { credentials } from '../config'

const auth0 = new Auth0(credentials)

class splash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggin: false
    }
  }

  componentDidMount() {
    loadKey((err, result) => {
      if (result) {
        this.props.navigation.replace('Main', {
          isNew: false,
          data: result
        })
      } else {
        this.setState({ isLoggin: false })
      }
    })
  }

  render() {
    return (
      <View style={apply('bg-blue flex-1 justify-center items-center')}>
        <View>
          <Text style={apply('text-white text-4xl italic font-semibold mb-10')}>
            BinTweet
          </Text>
        </View>
        {this.state.isLoggin ? (
          <View />
        ) : (
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
        )}
      </View>
    )
  }

  _onLogin = () => {
    this.setState({ isLoggin: true })
    const _this = this
    auth0.webAuth
      .authorize({
        scope: 'openid profile',
        audience: 'https://' + credentials.domain + '/userinfo'
      })
      .then(credentials => {
        auth0.auth.userInfo({ token: credentials.accessToken }).then(user => {
          _this.props.navigation.replace('Main', { data: user, isNew: true })
        })
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
}

export default splash
