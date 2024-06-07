import { useAuth } from '@/providers/AuthProvider'
import { Redirect, Stack } from 'expo-router'
import { Text } from 'react-native'

export default function AuthenticatedLayout() {
  const { session, loading } = useAuth()

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (!session) {
    return <Redirect href="/" />
  }

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
      <Stack.Screen name="home" />
      <Stack.Screen name="join" />
    </Stack>
  )
}
