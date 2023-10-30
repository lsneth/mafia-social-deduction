import React from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from './Icon'
import Text from './Text'
import colors from '../styles/colors'
import { useGameContext } from '../providers/GameProvider'
import PlayerCard from './PlayerCard'

export default function PlayerGrid() {
  const { gameData } = useGameContext()

  return (
    <View style={styles.grid}>
      {gameData.players.map((player) => (
        <PlayerCard name={player.player_id} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  grid: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginLeft: 25, marginRight: 25 },
})
