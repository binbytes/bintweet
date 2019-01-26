import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'

import Routes from './routes/index'
import { colors } from '../theme/config'
import { apply } from '../theme/styles'

class APP extends Component {
  render() {
    return (
      <View style={apply('flex-1')}>
        <StatusBar backgroundColor={colors['blue-dark']} />
        <Routes />
      </View>
    )
  }
}

export default APP
