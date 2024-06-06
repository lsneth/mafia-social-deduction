import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts as useOswald, Oswald_700Bold } from '@expo-google-fonts/oswald'
import { useFonts as useCrimsonText, CrimsonText_400Regular } from '@expo-google-fonts/crimson-text'

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
