import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { apply } from '../../theme/styles'

export const FormElement = props => {
  return (
    <View style={apply('my-3')}>
      <Text style={apply('text-grey-dark')}>{props.label}</Text>
      <TextInput
        style={apply('border-b border-grey px-0 py-1')}
        onChangeText={props.onChangeText}
        placeholder={props.label}
        value={props.value}
      />
    </View>
  )
}
