import React, { useState } from 'react'
import ParentView from '../components/ParentView'
import Text from '../components/Text'
import { useGame } from '../providers/GameProvider'
import PlayerGrid from '../components/PlayerGrid'
import Separator from '../components/Separator'
import { updateGame, updatePlayer } from '../services/gameServices'
import en from '../locales/en.json'
import BottomView from '../components/BottomView'
import Button from '../components/Button'

export default function Day() {
  const { players, loading: gameLoading, gameId, player } = useGame()

  const [voting, setVoting] = useState(true)

  const voteCounts: Record<string, number> = players?.reduce((counts: Record<string, number>, player) => {
    const { selectedPlayerId } = player
    if (selectedPlayerId) {
      counts[selectedPlayerId] = (counts[selectedPlayerId] || 0) + 1
    }
    return counts
  }, {})

  function getPlayerIdWithMostVotes(): string | undefined {
    // return false if not all players have voted
    if (!(Object.values(voteCounts).reduce((sum, count) => sum + count, 0) === players.length)) return undefined

    // return false if there is a tie
    const maxVoteCount = Math.max(...Object.values(voteCounts), 0)
    const playerIdsWithMaxVotes = Object.keys(voteCounts).filter((playerId) => voteCounts[playerId] === maxVoteCount)
    if (playerIdsWithMaxVotes.length === 1) {
      return playerIdsWithMaxVotes[0]
    }
    return undefined
  }

  // this is only set once, after the voting is complete. It is used to display who died
  const [playerIdWithMostVotesState, setPlayerIdWithMostVotesState] = useState<string>()
  // this will update many times an is only used to determine when to run the below if statement
  const playerIdWithMostVotes = getPlayerIdWithMostVotes()

  // when the vote counts are equal to the number of players and there is no tie (and we're in the voting phase), reset the selectedPlayerId for each player, kill the player with the most votes, and setVoting to false to display results (and continue button for host)
  if (playerIdWithMostVotes && voting) {
    setPlayerIdWithMostVotesState(playerIdWithMostVotes)
    players.forEach((player) => {
      if (player.playerId === playerIdWithMostVotes) {
        updatePlayer({
          gameId,
          playerId: player.playerId,
          change: { isAlive: false, selectedPlayerId: null },
        })
      } else {
        updatePlayer({
          gameId,
          playerId: player.playerId,
          change: { selectedPlayerId: null },
        })
      }
      setVoting(false)
    })
  }

  return (
    <ParentView
      backgroundImage={require('../../assets/images/day.png')}
      gradientValues={['#000000da', '#00000061', '#00000061']}
    >
      {voting ? (
        <>
          <Text size="sm">{en['day.vote-for.description']}</Text>
          <Separator size={40} />
          {!gameLoading ? <PlayerGrid voteCounts={voteCounts} /> : <></>}
        </>
      ) : (
        <>
          <Text>{`${players.find((player) => player.playerId === playerIdWithMostVotesState)?.firstName} ${en['day.died.description']}`}</Text>
          {player.isHost && (
            <BottomView>
              <Button
                onPress={() => {
                  updateGame({
                    gameId,
                    hostId: player.playerId,
                    change: { gamePhase: 'mafia' },
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
