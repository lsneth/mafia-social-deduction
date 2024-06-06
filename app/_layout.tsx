import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  )
}
