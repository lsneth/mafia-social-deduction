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
    <Stack>
      <Stack.Screen name="[gameId]" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      <Stack.Screen name="account" options={{ headerTitle: 'Account' }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="join" options={{ headerTitle: 'Join Game' }} />
    </Stack>
  )
}
