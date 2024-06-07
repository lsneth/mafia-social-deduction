import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function GameEndScreen() {
  const insets = useSafeAreaInsets()

  return (
    <ThemedView
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ThemedText>Game End</ThemedText>
    </ThemedView>
  )
}
