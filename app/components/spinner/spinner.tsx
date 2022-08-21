import React from 'react'
import { ActivityIndicator, View, ViewStyle } from 'react-native'
import { color } from '../../theme'

const CONTAINER: ViewStyle = {
  flex: 1, 
  justifyContent: 'center'
}

export const Spinner = () => {
  return (
    <View style={CONTAINER}>
      <ActivityIndicator color={color.palette.lightGrey} size={30} />
    </View>
  )
}
