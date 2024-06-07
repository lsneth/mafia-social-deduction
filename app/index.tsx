import { ThemedPressable } from '@/components/ThemedPressable'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Link } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const insets = useSafeAreaInsets()
  return (
    <ThemedView
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <ThemedText>Mafia: Social Deduction</ThemedText>
      <Link href="/auth" asChild>
        <ThemedPressable>
          {/* <Pressable className={`bg-red-800 m-1.5 p-3 rounded-full`}> */}
          <ThemedText>Sign in</ThemedText>
          {/* </Pressable> */}
        </ThemedPressable>
      </Link>
    </ThemedView>
  )
}
