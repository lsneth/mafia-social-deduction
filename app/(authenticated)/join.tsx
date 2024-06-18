import { useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import ThemedPressable from '@/components/ThemedPressable'
import ThemedView from '@/components/ThemedView'
import ThemedTextInput from '@/components/ThemedTextInput'
import Spacer from '@/components/Spacer'
import { joinGame } from '@/services/game-services'
import { router } from 'expo-router'
import { useProfile } from '@/providers/ProfileProvider'
import ThemedActivityIndicator from '@/components/ThemedActivityIndicator'
import getUserFriendlyErrMsg from '@/helpers/getUserFriendlyErrMsg'

export default function JoinScreen() {
  const [newGameId, setNewGameId] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { id: playerId, name: playerName } = useProfile()
  const [loading, setLoading] = useState<boolean>(false)

  if (loading) return <ThemedActivityIndicator />

  return (
    <ThemedView className="justify-center">
      <ThemedText>Enter a code to join a game.</ThemedText>
      <Spacer />
      <ThemedTextInput onChangeText={setNewGameId} value={newGameId} placeholder="XXXXXX" testID="game-id-input" />
      <ThemedPressable
        onPress={async () => {
          setLoading(true)
          console.log('playerId:', playerId)
          const errorMessage = await joinGame(newGameId, playerId, playerName)

          if (errorMessage) {
            setLoading(false)
            setErrorMessage(getUserFriendlyErrMsg(errorMessage))
          } else {
            setLoading(false)
            router.replace(`/game?id=${newGameId}`)
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
