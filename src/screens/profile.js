import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import { Mutation } from 'react-apollo'

import { FormElement } from '../components/formElement'
import { ProfilePic } from '../components/profilePic'
import { apply } from '../../theme/styles'
import { colors } from '../../theme/config'
import { USER_MUTATION } from '../graphql/user'
import Load from '../components/load'
import { saveKey } from '../utils/db'

class profile extends Component {
  constructor(props) {
    super(props)
    const {
      name,
      nickname,
      picture,
      sub
    } = this.props.navigation.state.params.user
    this.state = {
      name: name,
      email: nickname + '@gmail.com',
      picture: picture,
      socialId: sub,
      status: "I'm new here"
    }
  }

  render() {
    const { name, email, picture, socialId, status } = this.state
    return (
      <Mutation
        mutation={USER_MUTATION}
        variables={{ name, email, picture, socialId, status }}
      >
        {(insertUser, { loading, error }) => {
          const submit = () => {
            if (loading) return <Load />
            if (error) return <Text>Error</Text>
            insertUser()
            saveKey(socialId).then(() => this.props.navigation.replace('Home'))
          }
          return (
            <View style={apply('px-4')}>
              <StatusBar
                backgroundColor={colors.white}
                barStyle={'dark-content'}
              />
              <View style={apply('items-center p-8')}>
                <ProfilePic uri={picture} size={24} />
              </View>
              <View style={apply('mb-4')}>
                <Text style={apply('text-grey-darkest font-bold text-lg')}>
                  Profile
                </Text>
                <FormElement
                  label={'Name'}
                  value={name}
                  onChangeText={text => this.setState({ name: text })}
                />
                <FormElement
                  label={'Email'}
                  value={email}
                  onChangeText={text => this.setState({ email: text })}
                />
                <FormElement
                  label={'Status'}
                  value={status}
                  onChangeText={text => this.setState({ status: text })}
                />
              </View>
              <View>
                <TouchableOpacity
                  style={apply('bg-blue items-center p-4 rounded shadow')}
                  onPress={submit}
                >
                  <Text style={apply('text-white font-semibold text-base')}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
      </Mutation>
    )
  }
}

export default profile
