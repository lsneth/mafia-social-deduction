import { useNavigation, router } from 'expo-router'
import { useState } from 'react'
import { TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import resetRouter from '@/helpers/resetRouter'
import { ThemedText } from '@/components/ThemedText'
import ThemedPressable from '@/components/ThemedPressable'
import ThemedView from '@/components/ThemedView'

export default function JoinScreen() {
  const [gameId, setGameId] = useState<string>('')
  const navigation = useNavigation()
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
      <ThemedText>Enter a room code to join a game.</ThemedText>
      <TextInput onChangeText={setGameId} value={gameId} />
      <ThemedPressable onPress={() => resetRouter(router, navigation, `/${gameId}`)}>
        <ThemedText>Join Game</ThemedText>
      </ThemedPressable>
    </ThemedView>
  )
}
