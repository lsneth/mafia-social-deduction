import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useGame } from '../providers/GameProvider'
import PlayerCard from './PlayerCard'

export default function PlayerGrid({ onSelect }: { onSelect?: () => void }) {
  const { players } = useGame()
  const [selectedPlayerId, setSelectedPlayerId] = useState('')

  // TODO: show last initial for duplicate names. if last initial is the same, figure out another way to differentiate them.

  return (
    <View style={styles.grid}>
      {players?.map((player) => (
        <PlayerCard
          name={player.firstName}
          key={player.playerId}
          selected={!!onSelect ? player.playerId === selectedPlayerId : undefined}
          onSelect={
            !!onSelect
              ? () => {
                  setSelectedPlayerId(player.playerId)
                  onSelect()
                }
              : undefined
          }
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  grid: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginLeft: 25, marginRight: 25 },
})
