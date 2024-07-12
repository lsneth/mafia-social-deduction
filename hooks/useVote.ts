import { useGame } from '@/providers/GameProvider'
import {
  clearPlayerState,
  killPlayer,
  markPlayer,
  updateGamePhase,
  updateResult,
  updateVotedPlayerId,
  updateVoting,
} from '@/services/game-services'
import { Player } from '@/types/game-types'
import { useEffect } from 'react'

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

// TODO: display error when there is a tie
export default function useVote(phase: 'mafia' | 'investigator' | 'execution') {
  const { player, players, game } = useGame()

  const playerId = player!.profile_id
  const gameId = game!.id
  const voting = game!.voting
  const votedPlayerId = game!.voted_player_id
  const isHost = game!.host_id === playerId
  const roundCount = game!.round_count
  const votingPlayers = players!.filter((player) => player.is_alive && (player.role === phase || phase === 'execution'))
  const allVotingPlayersReady = votingPlayers!.every((player) => player.ready === true)
  const livingInvestigators = players!.filter(
    (player) => player.is_alive && !player.has_been_murdered && player.role === 'investigator',
  )

  // game end check
  const livingMafia = players!.filter((player) => player.is_alive && player.role === 'mafia')
  const livingNonMafia = players!.filter(
    (player) => player.is_alive && !player.has_been_murdered && player.role !== 'mafia',
  )
  const gameResult = // the game ends when all the mafia are dead or when the mafia equal or outnumber the non-mafia
    livingMafia.length === 0 ? 'innocent' : livingMafia.length >= livingNonMafia.length ? 'mafia' : null

  // set up for voting
  useEffect(() => {
    if (isHost) {
      async function setUpVoting() {
        // clear voted_player_id
        const { error: updateVotedPlayerIdError } = await updateVotedPlayerId(gameId, null)
        if (updateVotedPlayerIdError) throw updateVotedPlayerIdError
        // set voting to true
        const { error: updateVotingError } = await updateVoting(gameId, true)
        if (updateVotingError) throw updateVotingError
      }
      setUpVoting()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we only want to do this on our first render
  }, [])

  // voting/phase update
  useEffect(() => {
    if (isHost) {
      async function voteLogic() {
        if (allVotingPlayersReady) {
          // voting
          if (voting) {
            const votedPlayerId = getVotedPlayerId(votingPlayers)
            // if no tie
            if (votedPlayerId) {
              try {
                switch (phase) {
                  case 'execution':
                    const { error: killPlayerError } = await killPlayer(votedPlayerId)
                    if (killPlayerError) throw killPlayerError
                  // no break because we also want to run what is in the default case

                  case 'investigator':
                    const { error: markInvestigatedError } = await markPlayer('investigated', votedPlayerId)
                    if (markInvestigatedError) throw markInvestigatedError
                  // no break because we also want to run what is in the default case

                  case 'mafia':
                    const { error: markMurderedError } = await markPlayer('murdered', votedPlayerId)
                    if (markMurderedError) throw markMurderedError

                    if (gameResult && livingInvestigators.length <= 0) {
                      // if game is over and there are no investigators, save the result and update phase to end
                      try {
                        const { error: updateResultError } = await updateResult(gameId, gameResult)
                        if (updateResultError) throw updateResultError

                        const { error: updatePhaseError } = await updateGamePhase(gameId, 'end')
                        if (updatePhaseError) console.error(updatePhaseError)
                      } catch (error) {
                        console.error(error)
                      }
                    } else {
                      // skip straight to next phase, mafia phase doesn't need any confirmations
                      const { error: updateGamePhaseError } = await updateGamePhase(
                        gameId,
                        roundCount === 0 || livingInvestigators.length > 0 ? 'execution' : 'investigator',
                      )
                      if (updateGamePhaseError) throw updateGamePhaseError
                    }

                    break // break because we DO NOT want to run what is in the default case

                  default:
                    // even though it happens on phase change too, we want to clear player ready states so that we can do the confirmation all ready check (below)
                    const { error: clearPlayerStateError } = await clearPlayerState(gameId)
                    if (clearPlayerStateError) throw clearPlayerStateError

                    // update the game voting states
                    const { error: updateVotedPlayerIdError } = await updateVotedPlayerId(gameId, votedPlayerId)
                    if (updateVotedPlayerIdError) throw updateVotedPlayerIdError

                    const { error: updateVotingError } = await updateVoting(gameId, false)
                    if (updateVotingError) throw updateVotingError
                    break
                }
              } catch (error) {
                console.error(error)
              }
            }
            // if tie
            else {
              // reset voting so they can try to break the tie
              try {
                const { error } = await clearPlayerState(gameId)
                if (error) throw error
              } catch (error) {
                console.error(error)
              }
            }
          }
          // not voting, confirming (only in investigator and execution phases)
          else {
            // check for game end, if game is over, save the result and update phase to end
            if (gameResult) {
              try {
                const { error: updateResultError } = await updateResult(gameId, gameResult)
                if (updateResultError) throw updateResultError

                const { error: updatePhaseError } = await updateGamePhase(gameId, 'end')
                if (updatePhaseError) console.error(updatePhaseError)
              } catch (error) {
                console.error(error)
              }
            }
            // update phase
            else {
              const newPhase = phase === 'investigator' ? 'execution' : phase === 'execution' ? 'mafia' : 'end' // this 'end' should never happen here
              const { error } = await updateGamePhase(gameId, newPhase)
              if (error) console.error(error)
            }
          }
        }
      }
      voteLogic()
    }
  }, [
    allVotingPlayersReady,
    gameId,
    gameResult,
    isHost,
    livingInvestigators.length,
    phase,
    roundCount,
    voting,
    votingPlayers,
  ])

  return {
    voting: game!.voting,
    votedPlayer: players!.find((player) => player.profile_id === votedPlayerId),
    errorMessage: null,
  }
}
