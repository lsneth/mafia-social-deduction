import { Stack } from 'expo-router'

export default function GameLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: () => <></>,
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="day" />
      <Stack.Screen name="game-end" />
      <Stack.Screen name="index" />
      <Stack.Screen name="night" />
      <Stack.Screen name="role" />
    </Stack>
  )
}
