import { Link } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'
import { ThemedPressable } from '@/components/ThemedPressable'
import ThemedView from '@/components/ThemedView'

export default function AuthenticatedHomeScreen() {
  const insets = useSafeAreaInsets()
  return (
    <ThemedView
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      // className="bg-pink-700"
    >
      <ThemedText type="title">MAFIA</ThemedText>
      <ThemedText type="subtitle">Social Deduction</ThemedText>

      <Link href="/join" asChild>
        <ThemedPressable>
          <ThemedText>Join Game</ThemedText>
        </ThemedPressable>
      </Link>
      <Link href="/467958" replace asChild>
        <ThemedPressable>
          <ThemedText>Host Game</ThemedText>
        </ThemedPressable>
      </Link>
      <Link href="/account" asChild>
        <ThemedPressable>
          <ThemedText>Account</ThemedText>
        </ThemedPressable>
      </Link>
    </ThemedView>
  )
}
