import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { Query } from 'react-apollo'
import { inject, observer } from 'mobx-react'
import { GET_POST } from '../graphql/post'
import Post from './post'
import { LIMIT } from '../mix/config'

@inject('User')
@observer
class Posts extends Component {
  render() {
    return (
      <Query
        query={GET_POST}
        variables={{
          userIds: this.props.User.following,
          limit: LIMIT,
          offset: 0
        }}
      >
        {({ loading, error, data, fetchMore }) => {
          return (
            <View>
              <FlatList
                data={data.posts}
                renderItem={({ item }) => <Post data={item} />}
                keyExtractor={item => `${item.id}`}
                onEndReached={() => {
                  fetchMore({
                    variables: {
                      offset: data.posts.length
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      return Object.assign({}, prev, {
                        posts: [...prev.posts, ...fetchMoreResult.posts]
                      })
                    }
                  })
                }}
                onEndReachedThreshold={0.5}
              />
            </View>
          )
        }}
      </Query>
    )
  }
}

export default Posts
