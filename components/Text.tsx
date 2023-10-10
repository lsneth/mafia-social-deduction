import React from 'react'
import { StyleSheet, Text as BaseText, View } from 'react-native'
import colors from '../styles/colors'

export default function Text({
  children = 'loading',
  align = 'center',
  size = 'sm',
}: {
  children?: string
  align?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg'
}) {
  const styles = StyleSheet.create({
    text: {
      color: colors.white,
      textAlign: align,
    },
    sm: {
      fontSize: 16,
    },
    md: {
      fontSize: 25,
    },
    lg: {
      fontSize: 65,
    },
  })
  return (
    <View>
      <BaseText style={[styles.text, styles[size]]}>{children}</BaseText>
    </View>
  )
}
