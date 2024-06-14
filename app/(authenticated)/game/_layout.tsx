import { GameProvider } from '@/providers/GameProvider'
import { Stack } from 'expo-router'

export default function GameLayout() {
  return (
    <GameProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="day" />
        <Stack.Screen name="game-end" />
        <Stack.Screen name="index" />
        <Stack.Screen name="night" />
        <Stack.Screen name="role" />
      </Stack>
    </GameProvider>
  )
}
