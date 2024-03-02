import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Icon from './Icon'
import Text from './Text'
import colors from '../styles/colors'
import Separator from './Separator'

export default function PlayerCard({
  name,
  selected = false,
  onSelect,
}: {
  name: string
  selected?: boolean
  onSelect?: (() => void) | undefined
}) {
  return (
    <View style={[styles.card, selected ? styles.selected : styles.unselected]}>
      <Pressable
        onPress={onSelect ? () => onSelect() : undefined}
        disabled={!onSelect}
        android_disableSound
      >
        <View style={styles.center}>
          <Icon name="user-o" />
          <Separator />
        </View>
        <Text>{name}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    flexGrow: 1,
    flexBasis: 85,
    maxWidth: '31.5%',
    minHeight: '20%',
    // minWidth: 85, // TODO
    // minHeight: 85, // TODO
  },
  center: { alignItems: 'center' },
  selected: {
    backgroundColor: colors.lightGray,
  },
  unselected: {
    backgroundColor: colors.gray,
  },
})
