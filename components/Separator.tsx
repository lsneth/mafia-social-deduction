import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Separator({ size }: { size: 'xs' | 'sm' | 'md' | 'lg' }) {
  const styles = StyleSheet.create({
    xs: {
      marginTop: 5,
      marginBottom: 5,
    },
    sm: {
      marginTop: 12,
      marginBottom: 12,
    },
    md: {
      marginTop: 30,
      marginBottom: 30,
    },
    lg: {
      marginTop: 50,
      marginBottom: 50,
    },
  })

  return <View style={styles[size]} />
}
