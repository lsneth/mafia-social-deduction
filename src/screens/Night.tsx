import React, { useEffect, useState } from 'react'
import ParentView from '../components/ParentView'
import Text from '../components/Text'
import BottomView from '../components/BottomView'
import { useGame } from '../providers/GameProvider'
import en from '../locales/en.json'
import PlayerGrid from '../components/PlayerGrid'
import Separator from '../components/Separator'
import { updateGame, updatePlayer } from '../services/gameServices'
import Button from '../components/Button'

export default function Night() {
  const [dotCount, setDotCount] = useState<1 | 2 | 3>(1)
  const { player, gamePhase, roleCounts, players, gameId, hostId } = useGame()

  // this will be all the mafia during the mafia phase and all the detectives during the detective phase
  const activePlayers = players?.filter((player) => player.role === gamePhase && player.isAlive)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotCount((prev) => ((prev % 3) + 1) as 1 | 2 | 3)
    }, 1000)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [])

  const [mafiaChoosing, setMafiaChoosing] = useState(true)
  const [detectiveChoosing, setDetectiveChoosing] = useState(false)

  const choiceCounts: Record<string, number> = activePlayers?.reduce((counts: Record<string, number>, player) => {
    const { selectedPlayerId } = player
    if (selectedPlayerId) {
      counts[selectedPlayerId] = (counts[selectedPlayerId] || 0) + 1
    }
    return counts
  }, {})

  function getPlayerIdWithMostChoices(): string | undefined {
    // return false if not all activePlayers have voted
    if (!(Object.values(choiceCounts).reduce((sum, count) => sum + count, 0) === activePlayers.length)) return undefined

    // return false if there is a tie
    const maxVoteCount = Math.max(...Object.values(choiceCounts), 0)
    const playerIdsWithMaxChoices = Object.keys(choiceCounts).filter(
      (playerId) => choiceCounts[playerId] === maxVoteCount,
    )
    if (playerIdsWithMaxChoices.length === 1) {
      return playerIdsWithMaxChoices[0]
    }
    return undefined
  }

  // this is only set once, after the choosing is complete. It is used to display who died
  const [murderedPlayerId, setMurderedPlayerId] = useState<string>()
  // this will update many times an is only used to determine when to run the below if statement
  const playerIdWithMostChoices = getPlayerIdWithMostChoices()
  const chosenPlayer = players.find((player) => player.playerId === playerIdWithMostChoices)

  if (gamePhase === 'mafia' && playerIdWithMostChoices && mafiaChoosing) {
    setMafiaChoosing(false)
    setMurderedPlayerId(playerIdWithMostChoices)
    players.forEach((player) => {
      updatePlayer({
        gameId,
        playerId: player.playerId,
        change: { selectedPlayerId: null },
      })
    })
    updateGame({
      gameId,
      hostId: hostId ?? '',
      change: { gamePhase: 'detective' },
    })
    setDetectiveChoosing(true)
  }

  return (
    <ParentView
      backgroundImage={require('../../assets/images/night.png')}
      gradientValues={['#000000', 'transparent', 'transparent']}
    >
      <Text size="lg">{en['night.night.heading']}</Text>

      {mafiaChoosing || detectiveChoosing ? (
        player?.role === 'mafia' && gamePhase === 'mafia' ? (
          <>
            <Text size="sm">{en['night.mafia.description']}</Text>
            {roleCounts.mafia > 1 && <Text size="sm">{en['night.multiple-mafia.description']}</Text>}
            <Separator size={30} />
            <PlayerGrid />
          </>
        ) : player?.role === 'detective' && gamePhase === 'detective' ? (
          <>
            <Text size="sm">{en['night.detective.description']}</Text>
            {roleCounts.mafia > 1 && <Text size="sm">{en['night.multiple-detective.description']}</Text>}
            <Separator size={30} />
            <PlayerGrid selectable={!chosenPlayer} />
            {gamePhase === 'detective' && playerIdWithMostChoices && detectiveChoosing && (
              <>
                <Text size="md">{`${chosenPlayer?.firstName} ${chosenPlayer?.role === 'mafia' ? en['night.is-a-mafia.description'] : en['night.is-not-a-mafia.description']}`}</Text>
                <Button
                  onPress={() => {
                    players.forEach((player) => {
                      setDetectiveChoosing(false)
                      if (player.isHost) {
                        updatePlayer({
                          gameId,
                          playerId: player.playerId,
                          change: { selectedPlayerId: null, gamePhase: 'commonfolk' },
                        })
                      } else {
                        updatePlayer({
                          gameId,
                          playerId: player.playerId,
                          change: { selectedPlayerId: null },
                        })
                      }
                    })
                  }}
                >
                  {en['event.continue.action']}
                </Button>
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
        )
      ) : (
        <>
          <Text size="md">{`${players.find((player) => player.playerId === murderedPlayerId)?.firstName} ${en['night.was-killed.description']}`}</Text>
          {player?.isHost && (
            <BottomView>
              <Button
                onPress={() => {
                  console.log('hey')
                  updateGame({
                    gameId,
                    hostId: player.playerId,
                    change: { gamePhase: 'day' },
                  })
                  updatePlayer({
                    gameId,
                    playerId: murderedPlayerId ?? '',
                    change: { isAlive: false },
                  })
                }}
              >
                {en['event.continue.action']}
              </Button>
            </BottomView>
          )}
        </>
      )}
    </ParentView>
  )
}
