import React from 'react'
import { View, Text } from 'react-native'
import { apply } from '../../theme/styles'

export default (ListItem = props => {
  return (
    <View style={apply(`bg-${props.item.color} mb-2 px-4 py-2`)}>
      <Text style={apply('text-grey-darkest font-bold text-lg')}>
        {props.item.name}
      </Text>
      <Text style={apply('text-sm text-grey-darker')}>{props.item.status}</Text>
    </View>
  )
})
