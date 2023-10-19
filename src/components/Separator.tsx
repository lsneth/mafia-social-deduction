import React from 'react'
import { StyleSheet, View } from 'react-native'

export type SeparatorSize = 5 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100 | 110 | 120 | 130

export default function Separator({ size }: { size: SeparatorSize }) {
  return <View style={{ marginTop: size }} />
}
