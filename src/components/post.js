import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { apply } from '../../theme/styles'
import { ProfilePic } from './profilePic'
import Like from './like'
import { inject } from 'mobx-react'

@inject('User')
class Post extends Component {
  render() {
    const { id, content, user, like } = this.props.data

    return (
      <View style={apply('flex-row m-2')}>
        <ProfilePic uri={user.picture} size={10} />
        <View style={apply('ml-4 border flex-1 px-4')}>
          <Text style={apply('text-grey-darker text-lg font-bold py-2')}>
            {user.name}
          </Text>
          <Text style={apply('text-base text-justify')}>{content}</Text>
          <Like
            count={like.total.count}
            liked={like.userIds.some(user => user.id === this.props.User.id)}
            postId={id}
            userId={this.props.User.id}
          />
        </View>
      </View>
    )
  }
}

export default Post
