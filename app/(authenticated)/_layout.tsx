import { ThemedText } from '@/components/ThemedText'
import { useAuth } from '@/providers/AuthProvider'
import { Redirect, Stack } from 'expo-router'

export default function AuthenticatedLayout() {
  const { session, loading } = useAuth()

  if (loading) {
    return <ThemedText>Loading...</ThemedText>
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