import { useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import ThemedPressable from '@/components/ThemedPressable'
import ThemedView from '@/components/ThemedView'
import ThemedTextInput from '@/components/ThemedTextInput'
import Spacer from '@/components/Spacer'

export default function JoinScreen() {
  const [gameId, setGameId] = useState<string>('')

  return (
    <ThemedView className="justify-center">
      <ThemedText>Enter a code to join a game.</ThemedText>
      <Spacer />
      <ThemedTextInput onChangeText={setGameId} value={gameId} placeholder="XXXXXX" testID="game-id-input" />
      <ThemedPressable onPress={() => console.log('join game')} testID="join-game-button">
        <ThemedText>Join Game</ThemedText>
      </ThemedPressable>
      <Spacer size={20} />
    </ThemedView>
  )
}
