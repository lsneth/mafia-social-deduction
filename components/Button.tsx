import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button as BaseButton } from 'react-native-elements'
import colors from '../styles/colors'

export default function Button({
  disabled,
  onPress,
  title,
}: {
  disabled?: boolean
  onPress: () => void
  title: string
}) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.red,
      paddingTop: 12,
      paddingBottom: 12,
      margin: 7,
      marginLeft: 25,
      marginRight: 25,
      borderRadius: 22,
    },
    text: {
      color: colors.white,
      fontSize: 16,
    },
  })

  return (
    <View>
      <BaseButton
        title={title}
        onPress={() => onPress()}
        disabled={disabled}
        titleStyle={styles.text}
        buttonStyle={styles.button}
      />
    </View>
  )
}
