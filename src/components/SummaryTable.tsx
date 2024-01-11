import React from 'react'
import { StyleSheet, View } from 'react-native'
import Text from './Text'
import colors from '../styles/colors'
import { useGameContext } from '../providers/GameProvider'

export default function SummaryTable() {
  const { roleCounts } = useGameContext()

  return (
    <View style={styles.table}>
      <View style={styles.titleCell}>
        <Text>{`${roleCounts.total} Player${roleCounts.total !== 1 ? 's' : ''}`}</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={[styles.cell, styles.mafiaCell]}>
          <Text size="md">{roleCounts.mafia.toString()}</Text>
          <Text margin={0}>Mafia</Text>
        </View>
        <View style={[styles.cell, styles.detectiveCell]}>
          <Text size="md">{roleCounts.detective.toString()}</Text>
          <Text margin={0}>{`Detective${roleCounts.detective !== 1 ? 's' : ''}`}</Text>
        </View>
        <View style={[styles.cell, styles.commonfolkCell]}>
          <Text size="md">{roleCounts.commonfolk.toString()}</Text>
          <Text margin={0}>Commonfolk</Text>
        </View>
      </View>
    </View>
  )
}

const borderRadius: number = 10

const styles = StyleSheet.create({
  table: { marginLeft: 25, marginRight: 25 },
  titleCell: {
    backgroundColor: colors.gray,
    padding: 10,
    borderTopRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
  },
  cell: {
    flex: 1,
    padding: 10,
  },
  mafiaCell: {
    backgroundColor: colors.red,
    borderBottomLeftRadius: borderRadius,
  },
  detectiveCell: {
    backgroundColor: colors.blue,
  },
  commonfolkCell: {
    backgroundColor: colors.tan,
    borderBottomRightRadius: borderRadius,
  },
})
