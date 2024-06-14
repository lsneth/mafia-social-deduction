import { useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import ThemedPressable from '@/components/ThemedPressable'
import ThemedView from '@/components/ThemedView'
import ThemedTextInput from '@/components/ThemedTextInput'
import Spacer from '@/components/Spacer'
import { canJoinGame } from '@/services/game-services'
import { router } from 'expo-router'

export default function JoinScreen() {
  const [newGameId, setNewGameId] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  return (
    <ThemedView className="justify-center">
      <ThemedText>Enter a code to join a game.</ThemedText>
      <Spacer />
      <ThemedTextInput onChangeText={setNewGameId} value={newGameId} placeholder="XXXXXX" testID="game-id-input" />
      <ThemedPressable
        onPress={async () => {
          const canJoin = await canJoinGame(newGameId)
          if (canJoin === true) {
            router.replace(`/game?id=${newGameId}`)
          } else {
            setErrorMessage(canJoin)
          }
        }}
        testID="join-game-button"
      >
        <ThemedText>Join Game</ThemedText>
      </ThemedPressable>
      <Spacer />
      <ThemedText>{errorMessage}</ThemedText>
      <Spacer size={20} />
    </ThemedView>
  )
}
