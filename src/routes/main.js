import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'mobx-react'

import Home from '../screens/home'
import Profile from '../screens/profile'

import stores from '../store'
import createApolloClient from '../graphql/apollo'
import Load from '../components/load'
import { apply } from '../../theme/styles'

const RootNavigator = (data, isNew) => {
  const Root = createStackNavigator(
    {
      Profile: {
        screen: Profile,
        params: { data }
      },
      Home: {
        screen: Home,
        params: { data }
      }
    },
    {
      headerMode: 'none',
      initialRouteName: isNew ? 'Profile' : 'Home'
    }
  )

  const AppContainer = createAppContainer(Root)
  return <AppContainer />
}

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      client: null
    }
  }

  async componentDidMount() {
    const client = createApolloClient()
    this.setState({
      client
    })
  }

  render() {
    if (this.state.client) {
      const { data, isNew } = this.props.navigation.state.params
      return (
        <ApolloProvider client={this.state.client}>
          <Provider {...stores}>{RootNavigator(data, isNew)}</Provider>
        </ApolloProvider>
      )
    } else {
      return (
        <View style={apply('flex-1')}>
          <Load />
        </View>
      )
    }
  }
}

export default Main
