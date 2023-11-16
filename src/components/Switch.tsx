import React from 'react'
import colors from '../styles/colors'
import Text from './Text'
import { View, StyleSheet, Switch as BaseSwitch } from 'react-native'

export default function Switch({
  value,
  onChange,
  stateLabel,
  notStateLabel,
  editable,
}: {
  value: boolean
  onChange: () => void
  stateLabel: string
  notStateLabel: string
  editable: boolean
}) {
  return (
    <View style={styles.switch}>
      <View style={styles.spacer} />
      <Text>{stateLabel}</Text>
      <BaseSwitch
        trackColor={
          editable ? { false: colors.lightGray, true: colors.lightGray } : { false: colors.gray, true: colors.gray }
        }
        thumbColor={editable ? colors.red : colors.lightGray}
        value={value}
        onChange={() => onChange()}
        disabled={!editable}
      />
      <Text>{notStateLabel}</Text>
      <View style={styles.spacer} />
    </View>
  )
}

const styles = StyleSheet.create({
  switch: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  spacer: {
    flexGrow: 1,
  },
})
