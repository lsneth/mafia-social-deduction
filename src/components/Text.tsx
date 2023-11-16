import React from 'react'
import { StyleSheet, Text as BaseText, View } from 'react-native'
import colors from '../styles/colors'

export default function Text({
  children = 'loading',
  align = 'center',
  size = 'sm',
  style,
}: {
  children?: string
  align?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg'
  style?: {}
}) {
  return (
    <View style={{ ...style }}>
      <BaseText style={[{ textAlign: align }, styles.text, styles[size]]}>{children}</BaseText>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    marginLeft: 25,
    marginRight: 25,
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
