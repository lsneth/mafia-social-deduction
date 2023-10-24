import React from 'react'
import { StyleSheet, View } from 'react-native'
import Text from './Text'
import colors from '../styles/colors'

export default function Table({ title }: { title: string }) {
  return (
    <View>
      <View style={styles.titleBox}>
        <Text>{title}</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text>2 Mafia</Text>
          <Text>1 Detective</Text>
          <Text>5 Commonfolk</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  titleBox: {
    backgroundColor: colors.red,
  },
})
