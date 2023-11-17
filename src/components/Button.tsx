import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button as BaseButton } from 'react-native-elements'
import colors from '../styles/colors'

export default function Button({
  disabled,
  onPress,
  children,
  backgroundColor = 'red',
}: {
  disabled?: boolean
  onPress: () => void
  children: string | JSX.Element
  backgroundColor?: 'red' | 'gray'
}) {
  return (
    <View>
      <BaseButton
        title={children}
        onPress={disabled ? () => {} : () => onPress()}
        titleStyle={styles.text}
        buttonStyle={[styles.button, disabled ? styles.disabled : styles[backgroundColor]]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingTop: 12,
    paddingBottom: 12,
    margin: 5,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 22,
  },
  text: {
    color: colors.white,
    fontSize: 16,
  },
  red: {
    backgroundColor: colors.red,
  },
  gray: {
    backgroundColor: colors.gray,
  },
  disabled: {
    backgroundColor: colors.gray,
  },
})
