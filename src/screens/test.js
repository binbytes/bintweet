import React, { Component } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import ListItem from '../components/listItem'

const FETCH_USERS = gql`
  query($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      id
      name
      status
      color
    }
  }
`

class Test extends Component {
  render() {
    return (
      <Query
        query={FETCH_USERS}
        variables={{
          limit: 9,
          offset: 0
        }}
      >
        {({ data, error, loading, fetchMore }) => {
          console.log('Data', data, 'err', error, 'load', loading)

          if ((error || loading) && !data.users) {
            return (
              <View>
                <Text> Loading ... </Text>
              </View>
            )
          }

          return (
            <FlatList
              data={data.users}
              renderItem={({ item }) => <ListItem item={item} />}
              keyExtractor={item => item.id.toString()}
              onEndReachedThreshold={0.5}
              ListFooterComponent={() => <ActivityIndicator />}
              onEndReached={() => {
                console.log('On End')
                fetchMore({
                  variables: {
                    offset: data.users.length
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    console.log(
                      'PREV',
                      prev.users,
                      ' MORE ',
                      fetchMoreResult.users
                    )
                    return Object.assign({}, prev, {
                      users: [...prev.users, ...fetchMoreResult.users]
                    })
                  }
                })
              }}
            />
          )
        }}
      </Query>
    )
  }
}

export default Test
