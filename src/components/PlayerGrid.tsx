import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useGame } from '../providers/GameProvider'
import PlayerCard from './PlayerCard'
import { UserId } from '../types/types'
import { updatePlayer } from '../services/gameServices'

export default function PlayerGrid({ onSelect }: { onSelect?: () => void }) {
  const { players, gameId, player } = useGame()
  const [selectedPlayerId, setSelectedPlayerId] = useState('')
  const [selectionLoading, setSelectionLoading] = useState(false)

  useEffect(() => {
    setSelectedPlayerId(player.selectedPlayerId)
  }, [player.selectedPlayerId])

  function selectPlayer(selectedPlayerId: UserId) {
    setSelectionLoading(true)
    updatePlayer({
      gameId,
      playerId: player.playerId,
      change: { selectedPlayerId },
    })
      .then(() => setSelectionLoading(false))
      .catch(() => setSelectionLoading(false))
  }

  // TODO: show last initial for duplicate names. if last initial is the same, figure out another way to differentiate them.

  return (
    <View style={styles.grid}>
      {players?.map((player) => (
        <PlayerCard
          name={player.firstName}
          key={player.playerId}
          selected={
            !!onSelect ? player.playerId === selectedPlayerId : undefined
          }
          onSelect={
            !!onSelect
              ? () => {
                  setSelectedPlayerId(player.playerId) // to update the UI immediately
                  selectPlayer(player.playerId) // to update the backend, this takes about one second
                }
              : undefined
          }
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginLeft: 25,
    marginRight: 25,
  },
})
