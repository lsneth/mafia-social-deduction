import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function BottomView({ children }: { children: JSX.Element | JSX.Element[] }) {
  return <View style={styles.bottom}>{children}</View>
}

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
})
