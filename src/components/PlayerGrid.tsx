import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useGameContext } from '../providers/GameProvider'
import PlayerCard from './PlayerCard'

export default function PlayerGrid() {
  const { players } = useGameContext()

  // TODO: show last initial for duplicate names. if last initial is the same, figure out another way to differentiate them.

  return (
    <View style={styles.grid}>
      {players.map((player) => (
        <PlayerCard name={player.first_name} key={player.player_id} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  grid: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginLeft: 25, marginRight: 25 },
})
