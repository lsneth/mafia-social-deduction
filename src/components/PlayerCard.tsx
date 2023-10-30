import React from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from './Icon'
import Text from './Text'
import colors from '../styles/colors'

export default function PlayerCard({ name }: { name: string }) {
  return (
    <View style={styles.card}>
      <Icon name="user-o" />
      <Text>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.gray,
    padding: 10,
    alignItems: 'center',
    flexGrow: 1,
    flexBasis: 85,
    // minWidth: 85, // TODO
    // minHeight: 85, // TODO
  },
})
