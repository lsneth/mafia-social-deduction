import React from 'react'
import { View } from 'react-native'
import colors from '../styles/colors'
import { FontAwesome } from '@expo/vector-icons'

export default function Icon({ name }: { name: 'user-o' | 'pencil' }) {
  return (
    <View>
      <FontAwesome name={name} size={24} color={colors.white} />
    </View>
  )
}
