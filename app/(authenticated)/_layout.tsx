import { useAuth } from '@/providers/AuthProvider'
import { Redirect, Stack } from 'expo-router'
import colors from '@/constants/colors'
import ThemedActivityIndicator from '@/components/ThemedActivityIndicator'

export default function AuthenticatedLayout() {
  const { session, loading } = useAuth()

  if (loading) return <ThemedActivityIndicator />
  if (!session) return <Redirect href="/auth" />

  return (
    <Stack>
      <Stack.Screen name="[gameId]" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      <Stack.Screen
        name="account"
        options={{
          headerTitle: 'Account',
          headerTitleStyle: {
            color: colors.mafiaWhite,
            fontFamily: 'CrimsonText_400Regular',
          },
          headerShadowVisible: false,
          headerTintColor: colors.mafiaWhite, // back arrow
          headerStyle: { backgroundColor: colors.mafiaBlack },
        }}
      />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="join" options={{ headerTitle: 'Join Game' }} />
    </Stack>
  )
}
