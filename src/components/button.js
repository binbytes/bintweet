import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { apply } from '../../theme/styles'

export default (Button = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[apply('bg-blue px-4 py-2 rounded'), props.style]}
    >
      <Text style={apply('text-white')}>{props.title}</Text>
    </TouchableOpacity>
  )
})
