import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts as useOswald, Oswald_700Bold } from '@expo-google-fonts/oswald'
import { useFonts as useCrimsonText, CrimsonText_400Regular } from '@expo-google-fonts/crimson-text'
import { NativeWindStyleSheet } from 'nativewind'
import { AuthProvider } from '@/providers/AuthProvider'
import colors from '../constants/colors'
import * as SystemUI from 'expo-system-ui'

// This makes it so native-wind styles also work on web. For some reason it was necessary even though I'm currently using Expo 51 which is greater than 45.
// https://www.nativewind.dev/quick-starts/expo#expo-sdk-45
NativeWindStyleSheet.setOutput({
  default: 'native',
})

export default function RootLayout() {
  SystemUI.setBackgroundColorAsync(colors.mafiaBlack)

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
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: colors.mafiaBlack,
            },
          }}
        >
          <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
          <Stack.Screen
            name="auth"
            options={{
              headerTitle: 'Welcome to Mafia: Social Deduction!',
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
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </AuthProvider>
  )
}
