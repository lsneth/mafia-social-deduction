import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: () => <></>,
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="[gameId]" />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="account" />
      <Stack.Screen name="create-account" />
      <Stack.Screen name="index" />
      <Stack.Screen name="join" />
      <Stack.Screen name="login" />
    </Stack>
  )
}
