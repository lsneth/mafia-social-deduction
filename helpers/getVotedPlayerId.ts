import { Player } from '@/types/game-types'

export default function getVotedPlayerId(players: Player[]) {
  const votes: Record<string, number> = {}

  players.forEach((player) => {
    const selectedPlayerId = player.selected_player_id
    if (selectedPlayerId) {
      if (votes[selectedPlayerId]) votes[selectedPlayerId] += 1
      else votes[selectedPlayerId] = 1
    }
  })

  let maxVoteCount = 0
  let votedPlayerId = ''
  let duplicateVoteCount = 0

  Object.keys(votes).forEach((playerId) => {
    if (votes[playerId] >= maxVoteCount) {
      if (votes[playerId] === maxVoteCount) {
        duplicateVoteCount = votes[playerId]
      }
      maxVoteCount = votes[playerId]
      votedPlayerId = playerId
    }
  })

  return duplicateVoteCount === maxVoteCount ? null : votedPlayerId
}
