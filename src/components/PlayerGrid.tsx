import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useGame } from '../providers/GameProvider'
import PlayerCard from './PlayerCard'
import { UserId } from '../types/types'
import { updatePlayer } from '../services/gameServices'

export default function PlayerGrid({
  selectable = true,
  voteCounts,
}: {
  selectable?: boolean
  voteCounts?: Record<string, number>
}) {
  const { players, gameId, player: currentPlayer } = useGame()
  const [selectedPlayerId, setSelectedPlayerId] = useState('')

  useEffect(() => {
    // this is to make sure the backend stays king and the UI stays in sync since it is rendered from a different state
    // the reason it is rendered from a different state is because there was about a 1 second delay between the click and the backend update
    setSelectedPlayerId(currentPlayer.selectedPlayerId ?? '')
  }, [currentPlayer.selectedPlayerId])

  const selectPlayer = useCallback(
    (selectedPlayerId: UserId | null) => {
      updatePlayer({
        gameId,
        playerId: currentPlayer.playerId,
        change: { selectedPlayerId },
      })
    },
    [gameId, currentPlayer.playerId],
  )

  // TODO: show last initial for duplicate names. if last initial is the same, figure out another way to differentiate them.
  return (
    <View style={styles.grid}>
      {players?.map((player) => (
        <PlayerCard
          name={player.firstName}
          key={player.playerId}
          selected={
            selectable && player.playerId !== currentPlayer.playerId ? player.playerId === selectedPlayerId : undefined
          }
          onSelect={
            selectable && player.playerId !== currentPlayer.playerId
              ? () => {
                  setSelectedPlayerId(player.playerId) // to update the UI immediately
                  selectPlayer(player.playerId) // to update the backend, this takes about one second
                }
              : undefined
          }
          voteCount={voteCounts ? voteCounts[player.playerId as string] ?? 0 : undefined}
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
