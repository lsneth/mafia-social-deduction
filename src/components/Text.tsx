import React from 'react'
import { StyleSheet, Text as BaseText, View, ActivityIndicator } from 'react-native'
import colors from '../styles/colors'

export default function Text({
  children = <ActivityIndicator />,
  align = 'center',
  size = 'sm',
  style,
  margin = 25,
}: {
  children?: string | JSX.Element
  align?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg'
  style?: {}
  margin?: 0 | 25
}) {
  return (
    <View style={{ ...style }}>
      <BaseText style={[{ textAlign: align }, styles.text, margins[margin], styles[size]]}>{children}</BaseText>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: colors.white,
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

const margins = StyleSheet.create({
  0: {
    margin: 0,
  },
  25: {
    marginLeft: 25,
    marginRight: 25,
  },
})
