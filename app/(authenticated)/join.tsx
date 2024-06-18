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

export default function JoinScreen() {
  const [gameId, setGameId] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { id: playerId, loading: profileLoading } = useProfile()
  const [loading, setLoading] = useState<boolean>(false)

  if (loading) return <ThemedActivityIndicator />

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
            const { error } = await joinGame(gameId, playerId)
            if (error) throw error

            router.replace(`/game?id=${gameId}`)

            setLoading(false)
          } catch (error: any) {
            console.error(error)
            setErrorMessage(error.message)
            setLoading(false)
          }
        }}
        testID="join-game-button"
        disabled={profileLoading}
      >
        <ThemedText>Join Game</ThemedText>
      </ThemedPressable>
      <Spacer />
      <ThemedText>{errorMessage}</ThemedText>
      <Spacer size={20} />
    </ThemedView>
  )
}
