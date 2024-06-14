import { RoomProvider } from '@/providers/RoomProvider'
import { Stack } from 'expo-router'

export default function RoomLayout() {
  return (
    <RoomProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="game" />
        <Stack.Screen name="game-end" />
        <Stack.Screen name="index" />
      </Stack>
    </RoomProvider>
  )
}
