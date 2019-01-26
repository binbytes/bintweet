import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { apply } from '../../theme/styles'
import { colors } from '../../theme/config'

class Load extends Component {
  render() {
    return (
      <View style={apply('absolute w-full h-full items-center justify-center')}>
        <View
          style={[apply('p-4 rounded-lg'), { backgroundColor: '#cccccccc' }]}
        >
          <ActivityIndicator color={colors.blue} size={'large'} />
        </View>
      </View>
    )
  }
}

export default Load
