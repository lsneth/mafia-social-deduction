import React, { useState } from 'react'
import { View, TextInput as BaseTextInput, StyleSheet } from 'react-native'
import colors from '../styles/colors'
import Text from './Text'

export default function TextInput({
  value,
  onChangeText,
  placeholder,
  editable = true,
  autoFocus,
  secureTextEntry,
  label,
}: {
  value?: string
  onChangeText?: (text: string) => void
  placeholder?: string
  editable?: boolean
  autoFocus?: boolean
  secureTextEntry?: boolean
  label?: string
}) {
  const [focused, setFocused] = useState(false)

  return (
    <View style={styles.container}>
      {label && (
        <View style={{ paddingLeft: 5 }}>
          <Text align="left">{label}</Text>
        </View>
      )}
      <BaseTextInput
        value={value}
        onChangeText={onChangeText ? (text) => onChangeText(text) : undefined}
        placeholder={placeholder}
        placeholderTextColor={colors.lightGray}
        autoCapitalize={'none'}
        editable={editable}
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.textInput,
          editable ? (focused ? styles.focusedBorder : styles.blurredBorder) : styles.notEditableBorder,
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
    marginRight: 25,
  },
  textInput: {
    color: colors.white,
    borderWidth: 1,
    borderRadius: 22,
    backgroundColor: colors.black,
    padding: 8,
    paddingLeft: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  focusedBorder: {
    borderColor: colors.white,
  },
  blurredBorder: {
    borderColor: colors.lightGray,
  },
  notEditableBorder: {
    borderColor: colors.gray,
  },
})
