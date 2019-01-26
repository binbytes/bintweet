import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Mutation } from 'react-apollo'

import { apply } from '../../theme/styles'
import { colors } from '../../theme/config'
import { LIKE_POST, UNLIKE_POST } from '../graphql/post'

class Like extends Component {
  constructor(props) {
    super(props)
    this.state = {
      liked: this.props.liked,
      count: this.props.count
    }
  }

  render() {
    const { postId, userId } = this.props
    return (
      <Mutation
        mutation={this.state.liked ? UNLIKE_POST : LIKE_POST}
        variables={{ postId, userId }}
        update={(caches, { data }) => {
          if (data.like.row === 1) {
            let _count = this.state.count
            if (this.state.liked) _count--
            else _count++
            this.setState({ liked: !this.state.liked, count: _count })
          }
        }}
      >
        {(like, { error }) => {
          const _like = () => {
            if (error) console.log(error)
            like()
          }
          return (
            <TouchableOpacity
              style={apply('flex-row bg-grey-lightest py-2')}
              onPress={_like}
            >
              <Icon
                name={this.state.liked ? 'ios-heart' : 'ios-heart-empty'}
                size={20}
                style={apply('mx-2')}
                color={this.state.liked ? colors.pink : colors.grey}
              />
              <Text>{this.state.count}</Text>
            </TouchableOpacity>
          )
        }}
      </Mutation>
    )
  }
}

export default Like
