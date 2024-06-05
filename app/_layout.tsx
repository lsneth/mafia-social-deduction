import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="[gameId]" />
      <Stack.Screen name="+not-found.tsx" />
      <Stack.Screen name="account" />
      <Stack.Screen name="create-account" />
      <Stack.Screen name="host" />
      <Stack.Screen name="index" />
      <Stack.Screen name="join" />
      <Stack.Screen name="login" />
    </Stack>
  )
}
