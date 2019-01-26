import React, { Component } from 'react'
import { View, Image, TextInput, TouchableOpacity, Text } from 'react-native'
import { inject, observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Mutation } from 'react-apollo'

import { apply } from '../../theme/styles'
import { INSERT_POST } from '../graphql/post'
import Load from './load'

@inject('User')
@observer
class createPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: this.props.User.id,
      content: ''
    }
  }

  render() {
    const { userId, content } = this.state
    return (
      <Mutation mutation={INSERT_POST} variables={{ userId, content }}>
        {(insertPost, { loading, error }) => {
          const submit = () => {
            if (loading) return <Load />
            if (error) return <Text>Error</Text>
            insertPost()
          }
          return (
            <View style={apply('flex-row bg-teal-light justify-center')}>
              <View>
                <Image
                  source={{ uri: this.props.User.picture }}
                  style={apply('w-10 h-10 rounded-full')}
                />
              </View>
              <View style={apply('flex-1 bg-teal-lightest rounded-full')}>
                <TextInput
                  style={apply('p-1 px-4')}
                  onChangeText={text => this.setState({ content: text })}
                />
              </View>
              <View>
                <TouchableOpacity onPress={submit}>
                  <Icon name={'send'} size={32} />
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
      </Mutation>
    )
  }
}

export default createPost
