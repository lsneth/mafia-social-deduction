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
  const [gameId, setGameId] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { id: playerId, loading: profileLoading, name: playerName } = useProfile()

  console.log('playerName:', playerName)

  const [loading, setLoading] = useState<boolean>(false)

  if (loading || profileLoading) return <ThemedActivityIndicator />

  return (
    <ThemedView className="justify-center">
      <ThemedText>Enter a code to join a game.</ThemedText>
      <Spacer />
      <ThemedTextInput
        onChangeText={(text) => setGameId(text.toUpperCase())}
        value={gameId}
        placeholder="XXXXXX"
        testID="game-id-input"
      />
      <ThemedPressable
        onPress={async () => {
          setLoading(true)
          try {
            const { error } = await joinGame(gameId, playerId, playerName)
            if (error) throw error

            router.replace(`/game?id=${gameId}`)

            setLoading(false)
          } catch (error: any) {
            console.error(error)
            setErrorMessage(getUserFriendlyErrMsg(error.message))
            setLoading(false)
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
