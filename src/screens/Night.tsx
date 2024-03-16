import React, { useEffect, useState } from 'react'
import ParentView from '../components/ParentView'
import Text from '../components/Text'
import BottomView from '../components/BottomView'
import { useGame } from '../providers/GameProvider'
import en from '../locales/en.json'
import PlayerGrid from '../components/PlayerGrid'
import Separator from '../components/Separator'
import { updateGame, updatePlayer } from '../services/gameServices'

export default function Night() {
  const [dotCount, setDotCount] = useState<1 | 2 | 3>(1)
  const { player, gamePhase, roleCounts, players, gameId, hostId } = useGame()

  // this will be all the mafia during the mafia phase and all the detectives during the detective phase
  const activePlayers = players?.filter((player) => player.role === gamePhase)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotCount((prev) => ((prev % 3) + 1) as 1 | 2 | 3)
    }, 1000)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [])

  const [choosing, setChoosing] = useState(true)

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
    const playerIdsWithMaxVotes = Object.keys(choiceCounts).filter(
      (playerId) => choiceCounts[playerId] === maxVoteCount,
    )
    if (playerIdsWithMaxVotes.length === 1) {
      return playerIdsWithMaxVotes[0]
    }
    return undefined
  }

  // this is only set once, after the choosing is complete. It is used to display who died
  const [murderedPlayerId, setMurderedPlayerId] = useState<string>()
  // this will update many times an is only used to determine when to run the below if statement
  const playerIdWithMostChoices = getPlayerIdWithMostChoices()

  // when the vote counts are equal to the number of players and there is no tie (and we're in the voting phase), reset the selectedPlayerId for each player, kill the player with the most votes, and setVoting to false to display results (and continue button for host)
  if (playerIdWithMostChoices && choosing) {
    if (gamePhase === 'mafia') {
      setMurderedPlayerId(playerIdWithMostChoices)
      players.forEach((player) => {
        updatePlayer({
          gameId,
          playerId: player.playerId,
          change: { selectedPlayerId: null },
        })
        updateGame({
          gameId,
          hostId: hostId ?? '',
          change: { gamePhase: 'detective' },
        })
      })
    } else if (gamePhase === 'detective') {
      players.forEach((player) => {
        updatePlayer({
          gameId,
          playerId: player.playerId,
          change: { selectedPlayerId: null },
        })
        setChoosing(false)
      })
    }
  }

  return (
    <ParentView
      backgroundImage={require('../../assets/images/night.png')}
      gradientValues={['#000000', 'transparent', 'transparent']}
    >
      <Text size="lg">{en['night.night.heading']}</Text>

      {choosing ? (
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
            <PlayerGrid />
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
        <Text size="md">{`${players.find((player) => player.playerId === murderedPlayerId)?.firstName} ${en['night.was-killed.description']}`}</Text>
      )}
    </ParentView>
  )
}
