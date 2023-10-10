import React from 'react'
import { View, TextInput as BaseTextInput, StyleSheet } from 'react-native'
import colors from '../styles/colors'

export default function TextInput({
  value,
  onChangeText,
  placeholder,
  editable,
  autoFocus,
  secureTextEntry,
}: {
  value?: string
  onChangeText?: (text: string) => void
  placeholder?: string
  editable?: boolean
  autoFocus?: boolean
  secureTextEntry?: boolean
}) {
  const styles = StyleSheet.create({
    container: {
      marginLeft: 25,
      marginRight: 25,
    },
    textInput: {
      color: colors.white,
      borderWidth: 1,
      borderRadius: 22,
      backgroundColor: colors.gray,
      padding: 8,
      paddingLeft: 16,
      marginTop: 5,
      marginBottom: 5,
    },
  })

  return (
    <View style={styles.container}>
      <BaseTextInput
        value={value}
        onChangeText={onChangeText ? (text) => onChangeText(text) : undefined}
        placeholder={placeholder}
        placeholderTextColor={colors.white}
        autoCapitalize={'none'}
        editable={editable}
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
        style={styles.textInput}
      />
    </View>
  )
}
