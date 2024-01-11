import React from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from './Icon'
import Text from './Text'
import colors from '../styles/colors'
import Separator from './Separator'

export default function PlayerCard({ name }: { name: string }) {
  return (
    <View style={styles.card}>
      <Icon name="user-o" />
      <Separator />
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
    maxWidth: '31.5%',
    minHeight: '20%',
    // minWidth: 85, // TODO
    // minHeight: 85, // TODO
  },
})
