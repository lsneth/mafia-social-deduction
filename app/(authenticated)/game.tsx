import ThemedActivityIndicator from '@/components/ThemedActivityIndicator'
import GameEnd from '@/components/game-screens/GameEnd'
import Innocent from '@/components/game-screens/Innocent'
import Investigator from '@/components/game-screens/Investigator'
import Lobby from '@/components/game-screens/Lobby'
import Mafia from '@/components/game-screens/Mafia'
import Role from '@/components/game-screens/Role'
import { GameProvider, useGame } from '@/providers/GameProvider'
import { Redirect } from 'expo-router'

function GameManager() {
  const { players, player, game, loading } = useGame()
  const phase = game?.phase
  const playerCount = players?.length ?? 0

  if (loading) return <ThemedActivityIndicator />
  if (!game || !player || !players || playerCount <= 0 || (phase !== 'lobby' && playerCount < 5))
    return <Redirect href="/+not-found" />

  return (
    <>
      {phase === 'lobby' ? <Lobby /> : null}
      {phase === 'role' ? <Role /> : null}
      {phase === 'mafia' ? <Mafia /> : null}
      {phase === 'innocent' ? <Innocent /> : null}
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
