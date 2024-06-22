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
  const { players, game, loading } = useGame()

  if (loading) return <ThemedActivityIndicator />
  if (!game || (players?.length ?? 0) <= 0) return <Redirect href="/+not-found" />

  return (
    <>
      {game!.phase === 'lobby' ? <Lobby /> : null}
      {game!.phase === 'role' ? <Role /> : null}
      {game!.phase === 'mafia' ? <Mafia /> : null}
      {game!.phase === 'innocent' ? <Innocent /> : null}
      {game!.phase === 'investigator' ? <Investigator /> : null}
      {game!.phase === 'end' ? <GameEnd /> : null}
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
