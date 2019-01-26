import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { apply } from '../../theme/styles'

export const ProfilePic = props => {
  return (
    <View>
      <Image
        source={
          props.uri === ''
            ? require('../../img/avatar.png')
            : {
                uri: props.uri
              }
        }
        style={apply(`w-${props.size} h-${props.size} bg-blue rounded-full`)}
      />
    </View>
  )
}
