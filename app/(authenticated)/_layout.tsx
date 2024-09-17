import { useAuth } from '@/providers/AuthProvider'
import { Redirect, Stack } from 'expo-router'
import colors from '@/constants/colors'
import ThemedActivityIndicator from '@/components/ThemedActivityIndicator'
import { ProfileProvider } from '@/providers/ProfileProvider'

export default function AuthenticatedLayout() {
  const { session, loading } = useAuth()

  if (loading) return <ThemedActivityIndicator />
  if (!session) return <Redirect href="/auth?has-account=true" />

  return (
    <ProfileProvider>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: colors.mafiaBlack,
          },
        }}
      >
        <Stack.Screen name="game" options={{ headerShown: false }} />
        <Stack.Screen
          name="account"
          options={{
            headerTitle: 'Account',
            headerTitleStyle: {
              color: colors.mafiaWhite,
              fontFamily: 'CrimsonText_400Regular',
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTintColor: colors.mafiaWhite, // back arrow
            headerStyle: { backgroundColor: colors.mafiaBlack },
          }}
        />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen
          name="join"
          options={{
            headerTitle: 'Join Game',
            headerTitleStyle: {
              color: colors.mafiaWhite,
              fontFamily: 'CrimsonText_400Regular',
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTintColor: colors.mafiaWhite, // back arrow
            headerStyle: { backgroundColor: colors.mafiaBlack },
          }}
        />
        <Stack.Screen
          name="rules"
          options={{
            headerTitle: 'How to Play',
            headerTitleStyle: {
              color: colors.mafiaWhite,
              fontFamily: 'CrimsonText_400Regular',
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTintColor: colors.mafiaWhite, // back arrow
            headerStyle: { backgroundColor: colors.mafiaBlack },
          }}
        />
      </Stack>
    </ProfileProvider>
  )
}
