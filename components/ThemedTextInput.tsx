import React from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import { ThemedText } from './ThemedText'
import colors from '../constants/colors'

type ThemedTextInputProps = TextInputProps & { label: string }

export default function ThemedTextInput({ className, label, ...rest }: ThemedTextInputProps): JSX.Element {
  return (
    <View className="w-full max-w-sm">
      <ThemedText>{label}</ThemedText>
      <TextInput
        style={{ fontFamily: 'CrimsonText_400Regular' }}
        className={`border-mafiaWhite text-mafiaWhite border-2 text-lg rounded-full py-3 px-5 my-1 ${className}`}
        placeholderTextColor={colors.mafiaGray}
        {...rest}
      />
    </View>
  )
}
