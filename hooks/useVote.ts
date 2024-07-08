import { useGame } from '@/providers/GameProvider'
import { clearPlayerState, killPlayer, markPlayer, updateGamePhase, updateResult } from '@/services/game-services'
import { Phase, Player } from '@/types/game-types'
import { useEffect, useState } from 'react'

function getVotedPlayerId(players: Player[]) {
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

export default function useVote(phase: 'mafia' | 'investigator' | 'execution') {
  const [voting, setVoting] = useState(true)
  const { player, players, game } = useGame()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [votedPlayer, setVotedPlayer] = useState<Player | null>(null)

  const playerId = player!.profile_id
  const isHost = game!.host_id === playerId
  const votingPlayers = players?.filter((player) => player.is_alive && (player.role === phase || phase === 'execution'))
  const allVotingPlayersReady = votingPlayers!.every((player) => player.ready === true)
  const livingMafia = players!.filter((player) => player.is_alive && player.role === 'mafia')
  const livingNonMafia = players!.filter(
    (player) => player.is_alive && !player.has_been_murdered && player.role !== 'mafia',
  )
  const gameResult = // the game ends when all the mafia are dead or when the mafia equal or outnumber the non-mafia
    livingMafia.length === 0 ? 'innocent' : livingMafia.length >= livingNonMafia.length ? 'mafia' : null

  useEffect(() => {
    async function endVoting() {
      if (isHost) {
        // we only want to make game changes from the host's device
        if (allVotingPlayersReady) {
          // if all players are in ready state
          if (voting) {
            const votedPlayerId = getVotedPlayerId(votingPlayers!)
            if (votedPlayerId) {
              // if it isn't a tie
              try {
                if (phase === 'execution') {
                  const { error: killPlayerError } = await killPlayer(votedPlayerId)
                  if (killPlayerError) throw killPlayerError
                } else {
                  const { error: markPlayerError } = await markPlayer(
                    phase === 'mafia' ? 'murdered' : 'investigated',
                    votedPlayerId,
                  )
                  if (markPlayerError) throw markPlayerError
                }

                // even though it happens on phase change already, we want to clear player states so that we can do the check before navigating (below)
                const { error: clearPlayerStateError } = await clearPlayerState(game!.id)
                if (clearPlayerStateError) throw clearPlayerStateError

                setVotedPlayer(players!.find((player) => player.profile_id === votedPlayerId) ?? null)
                setVoting(false)
              } catch (error) {
                console.error(error)
              }
            } else {
              // if it is a tie
              try {
                setErrorMessage('The tie must be resolved.')
                const { error } = await clearPlayerState(game!.id)
                if (error) throw error
              } catch (error) {
                console.error(error)
              }
            }
          } else {
            if (
              phase === 'mafia' ||
              votingPlayers?.find((player) => player.selected_player_id !== null) === undefined // this means it's the second time they're ready.
            ) {
              let newPhase: Phase
              switch (phase) {
                case 'mafia':
                  newPhase = game?.round_count === 0 ? 'execution' : 'investigator'
                  break
                case 'investigator':
                  // if game is over, save the result so that we can use that data on the GameEnd screen
                  if (gameResult) {
                    // this is the case that the game ended because of a player the mafia killed in the night
                    try {
                      const { error } = await updateResult(game!.id, gameResult)
                      if (error) throw error
                    } catch (error) {
                      console.error(error)
                    }
                  }
                  // figure out if game is over, if it is: game end, else: execution
                  newPhase = gameResult ? 'end' : 'execution'
                  break
                case 'execution':
                  // if game is over, save the result so that we can use that data on the GameEnd screen
                  if (gameResult) {
                    // this is the case that the game ended because of a player the innocents killed in the day
                    try {
                      const { error } = await updateResult(game!.id, gameResult)
                      if (error) throw error
                    } catch (error) {
                      console.error(error)
                    }
                  }
                  // figure out if game is over, if it is: game end, else: mafia
                  newPhase = gameResult ? 'end' : 'mafia'
                  break

                default:
                  // this should never happen
                  newPhase = 'end'
                  break
              }
              const { error } = await updateGamePhase(game!.id, newPhase)
              if (error) console.error(error)
            }
          }
        }
      }
    }
    endVoting()
  }, [allVotingPlayersReady, game, gameResult, isHost, phase, players, voting, votingPlayers])

  return { voting, votedPlayer, errorMessage }
}
