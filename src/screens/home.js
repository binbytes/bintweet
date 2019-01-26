import React, { Component } from 'react'
import { View, FlatList, Text } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Query } from 'react-apollo'

import { apply } from '../../theme/styles'
import { GET_USER_BY_SOCIAL_ID } from '../graphql/user'
import Load from '../components/load'
import CreatePost from '../components/createPost'
import Posts from '../components/posts'

@inject('User')
@observer
class Home extends Component {
  constructor(props) {
    super(props)
    this.props.User.socialId = this.props.navigation.state.params.data
  }

  render() {
    return (
      <Query
        query={GET_USER_BY_SOCIAL_ID}
        variables={{ socialId: this.props.User.socialId }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Load />
          if (error) return <View />
          if (data) {
            this.props.User.setUser(data.users[0])
            return (
              <View style={apply('flex-1')}>
                {/* <CreatePost /> */}
                <Posts />
              </View>
            )
          }
        }}
      </Query>
    )
  }
}

export default Home
