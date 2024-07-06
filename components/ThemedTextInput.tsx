import React from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import { ThemedText } from './ThemedText'
import colors from '../constants/colors'

type ThemedTextInputProps = TextInputProps & { label?: string }

export default function ThemedTextInput({ className, label, ...rest }: ThemedTextInputProps): JSX.Element {
  return (
    <View className="w-full">
      <ThemedText>{label}</ThemedText>
      <TextInput
        style={{ fontFamily: 'CrimsonText_400Regular' }}
        className={`rounded-full border-2 border-mafiaWhite px-5 py-3 text-lg text-mafiaWhite ${className}`}
        placeholderTextColor={colors.mafiaGray}
        {...rest}
      />
    </View>
  )
}
