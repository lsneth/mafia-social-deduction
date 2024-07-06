import ThemedActivityIndicator from '@/components/ThemedActivityIndicator'
import GameEnd from '@/components/game-screens/GameEnd'
import Execution from '@/components/game-screens/Execution'
import Investigator from '@/components/game-screens/Investigator'
import Lobby from '@/components/game-screens/Lobby'
import Mafia from '@/components/game-screens/Mafia'
import Role from '@/components/game-screens/Role'
import { GameProvider, useGame } from '@/providers/GameProvider'
import { clearPlayerState } from '@/services/game-services'
import { Redirect } from 'expo-router'
import { useEffect } from 'react'

function GameManager() {
  const { players, player, game, loading } = useGame()
  const phase = game?.phase
  const playerCount = players?.length ?? 0

  useEffect(() => {
    async function resetPlayerState() {
      if (!window.Cypress) {
        try {
          const { error } = await clearPlayerState(game?.id ?? '')
          if (error) throw error
        } catch (error) {
          console.error(error)
        }
      }
    }

    resetPlayerState()

    // eslint-disable-next-line react-hooks/exhaustive-deps -- we only want to run this for new game phases
  }, [phase])

  if (loading) return <ThemedActivityIndicator />
  if (!game || !player || !players || playerCount <= 0 || (phase !== 'lobby' && playerCount < 5))
    return <Redirect href="/+not-found" />

  return (
    <>
      {phase === 'lobby' ? <Lobby /> : null}
      {phase === 'role' ? <Role /> : null}
      {phase === 'mafia' ? <Mafia /> : null}
      {phase === 'innocent' ? <Execution /> : null}
      {phase === 'investigator' ? <Investigator /> : null}
      {phase === 'end' ? <GameEnd /> : null}
    </>
  )
}

export default function GameScreen() {
  return (
    <GameProvider>
      <GameManager />
    </GameProvider>
  )
}
