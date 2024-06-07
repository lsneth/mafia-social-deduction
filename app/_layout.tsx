import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts as useOswald, Oswald_700Bold } from '@expo-google-fonts/oswald'
import { useFonts as useCrimsonText, CrimsonText_400Regular } from '@expo-google-fonts/crimson-text'
import { NativeWindStyleSheet } from 'nativewind'
import { AuthProvider } from '@/providers/AuthProvider'
import { AppState } from 'react-native'
import { supabase } from '@/lib/supabase'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

// This makes it so native-wind styles also work on web. For some reason it was necessary even though I'm currently using Expo 51 which is greater than 45.
// https://www.nativewind.dev/quick-starts/expo#expo-sdk-45
NativeWindStyleSheet.setOutput({
  default: 'native',
})

export default function RootLayout() {
  let [oswaldLoaded, oswaldError] = useOswald({
    Oswald_700Bold,
  })
  let [crimsonTextLoaded, crimsonTextError] = useCrimsonText({
    CrimsonText_400Regular,
  })

  if ((!oswaldLoaded && !oswaldError) || (!crimsonTextLoaded && !crimsonTextError)) {
    return null
  }

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerTitle: 'Sign in or Sign up' }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </AuthProvider>
  )
}
