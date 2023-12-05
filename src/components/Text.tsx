import React from 'react'
import { StyleSheet, Text as BaseText, View, ActivityIndicator } from 'react-native'
import colors from '../styles/colors'

export default function Text({
  children = <ActivityIndicator />,
  align = 'center',
  size = 'sm',
  style,
  noMargin,
}: {
  children?: string | JSX.Element
  align?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg'
  style?: {}
  noMargin?: boolean
}) {
  return (
    <View style={{ ...style }}>
      <BaseText style={[{ textAlign: align }, styles.text, !noMargin && styles.margin, styles[size]]}>
        {children}
      </BaseText>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: colors.white,
  },
  margin: {
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
