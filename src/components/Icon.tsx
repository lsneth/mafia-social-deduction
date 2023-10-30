import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import colors from '../styles/colors'
import { FontAwesome } from '@expo/vector-icons'
import Text from './Text'

export default function Icon({ name }: { name: 'user-o' | 'pencil' }) {
  return (
    <View>
      <FontAwesome name={name} size={24} color={colors.white} />
    </View>
  )
}
