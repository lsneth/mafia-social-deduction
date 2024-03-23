import React, { useEffect, useRef, useState } from 'react'
import ParentView from '../../components/ParentView'
import Text from '../../components/Text'
import BottomView from '../../components/BottomView'
import { useGame } from '../../providers/GameProvider'
import en from '../../locales/en.json'
import PlayerGrid from '../../components/PlayerGrid'
import Separator from '../../components/Separator'
import { updateGame, updatePlayer } from '../../services/gameServices'
import Button from '../../components/Button'

export default function Night() {
  const [dotCount, setDotCount] = useState<1 | 2 | 3>(1)
  const { player, gamePhase, players, gameId, hostId } = useGame()
  const votedPlayerId = useRef<string | undefined>(undefined)

  const livingPlayers = players?.filter((player) => player.isAlive)
  const activePlayers = livingPlayers?.filter((player) => player.role === gamePhase) // this is all mafia/detectives on their turn
  const votedPlayer = livingPlayers.find((player) => player.playerId === votedPlayerId.current)

  const allActivePlayersHaveVoted = activePlayers?.every((player) => player.selectedPlayerId)
  const voteIsUnanimous = activePlayers.every((player) => player.selectedPlayerId === activePlayers[0].selectedPlayerId)
  if (allActivePlayersHaveVoted && voteIsUnanimous && activePlayers[0].selectedPlayerId) {
    votedPlayerId.current = activePlayers[0].selectedPlayerId
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotCount((prev) => ((prev % 3) + 1) as 1 | 2 | 3)
    }, 1000)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [])

  if (votedPlayerId.current) {
    if (gamePhase === 'mafia') {
      updatePlayer({ gameId, playerId: votedPlayerId.current, change: { causeOfDeath: 'murder' } })
      votedPlayerId.current = undefined
      players?.forEach((player) => {
        updatePlayer({ gameId, playerId: player.playerId, change: { selectedPlayerId: null } })
      })
      updateGame({ gameId, hostId: hostId ?? '', change: { gamePhase: 'detective' } })
    }
  }

  return (
    <ParentView
      backgroundImage={require('../../assets/images/night.png')}
      gradientValues={['#000000', 'transparent', 'transparent']}
    >
      <Text size="lg">{en['night.night.heading']}</Text>
      <Separator />

      {player.role === gamePhase ? (
        <>
          <Text>{gamePhase === 'mafia' ? en['night.mafia.description'] : en['night.detective.description']}</Text>
          <Separator size={30} />
          <PlayerGrid />
          {player.role === 'detective' && votedPlayerId.current && (
            <>
              <Text size="md">
                {`${votedPlayer?.firstName} ${votedPlayer?.role === 'mafia' ? en['night.is-a-mafia.description'] : en['night.is-not-a-mafia.description']}`}
              </Text>
              <BottomView>
                <Button
                  onPress={() => {
                    updateGame({ gameId, hostId: hostId ?? '', change: { gamePhase: 'commonfolk' } })
                    players?.forEach((player) => {
                      updatePlayer({ gameId, playerId: player.playerId, change: { selectedPlayerId: null } })
                    })
                  }}
                >
                  {en['event.continue.action']}
                </Button>
              </BottomView>
            </>
          )}
        </>
      ) : (
        <BottomView>
          {dotCount === 1 ? (
            <Text size="lg">.</Text>
          ) : dotCount === 2 ? (
            <Text size="lg">..</Text>
          ) : (
            <Text size="lg">...</Text>
          )}
        </BottomView>
      )}
    </ParentView>
  )
}
