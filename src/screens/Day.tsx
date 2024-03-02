import React from 'react'
import ParentView from '../components/ParentView'
import Text from '../components/Text'
import { useGame } from '../providers/GameProvider'
import PlayerGrid from '../components/PlayerGrid'
import Separator from '../components/Separator'
import { RootStackParamList } from '../../App'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { updatePlayer } from '../services/gameServices'
export default function Day({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Day'>
}) {
  const { players, loading: gameLoading, gameId } = useGame()

  const voteCounts: Record<string, number> = players?.reduce(
    (counts: Record<string, number>, player) => {
      const { selectedPlayerId } = player
      if (selectedPlayerId) {
        counts[selectedPlayerId] = (counts[selectedPlayerId] || 0) + 1
      }
      return counts
    },
    {},
  )

  function getPlayerWithMostVotes(): string | undefined {
    const maxVoteCount = Math.max(...Object.values(voteCounts), 0)
    const playerIdsWithMaxVotes = Object.keys(voteCounts).filter(
      (playerId) => voteCounts[playerId] === maxVoteCount,
    )
    if (playerIdsWithMaxVotes.length === 1) {
      return playerIdsWithMaxVotes[0]
    }
    return undefined
  }

  const playerIdWithMostVotes = getPlayerWithMostVotes()

  const allPlayersHaveVoted =
    Object.values(voteCounts).reduce((sum, count) => sum + count, 0) ===
    players.length

  // when the vote counts are equal to the number of players and there is no tie, navigate away and reset the selectedPlayerId for each player
  if (allPlayersHaveVoted && playerIdWithMostVotes) {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Event',
          params: {
            eventText: `${players.find((player) => player.playerId === playerIdWithMostVotes)!.firstName} died!`,
          },
        },
      ],
    })
    players.forEach((player) => {
      updatePlayer({
        gameId,
        playerId: player.playerId,
        change: { selectedPlayerId: null },
      })
    })
  }

  return (
    <ParentView
      backgroundImage={require('../../assets/images/day.png')}
      gradientValues={['#000000da', '#00000061', '#00000061']}
    >
      <Text size="sm">Vote for the player you wish to hang.</Text>
      <Separator size={40} />
      {!gameLoading ? <PlayerGrid voteCounts={voteCounts} /> : <></>}
    </ParentView>
  )
}
