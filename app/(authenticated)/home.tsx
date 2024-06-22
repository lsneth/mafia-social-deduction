import { Link, router } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import ThemedPressable from '@/components/ThemedPressable'
import ThemedView from '@/components/ThemedView'
import Group from '@/components/Group'
import backgroundImage from '../../assets/images/mafia-bg.png'
import { useProfile } from '@/providers/ProfileProvider'
import { createGame, getGameId, joinGame } from '@/services/game-services'
import { useState } from 'react'
import ThemedActivityIndicator from '@/components/ThemedActivityIndicator'

export default function AuthenticatedHomeScreen() {
  const { id: profileId, loading: profileLoading, name: playerName } = useProfile()
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  if (loading || profileLoading) return <ThemedActivityIndicator />

  return (
    <ThemedView bgImageSrc={backgroundImage} className="justify-between">
      <Group>
        <ThemedText type="title">MAFIA</ThemedText>
        <ThemedText type="subtitle">Social Deduction</ThemedText>
      </Group>

      <Group>
        {errorMessage ? <ThemedText>{errorMessage}</ThemedText> : null}
        <Link href="/join" asChild>
          <ThemedPressable>
            <ThemedText>Join Game</ThemedText>
          </ThemedPressable>
        </Link>
        <ThemedPressable
          onPress={async () => {
            setLoading(true)
            try {
              // create row in 'games' table
              const { error: createGameError } = await createGame(profileId)
              if (createGameError) throw createGameError

              // get game id from 'games' table
              const { data: gameIdData, error: gameIdError } = await getGameId(profileId)
              if (gameIdError) throw gameIdError

              // add player to 'players' table as host
              const { error: addPlayerError } = await joinGame(gameIdData.id, profileId, playerName, true)
              if (addPlayerError) throw addPlayerError

              // navigate to lobby
              router.replace(`/game?id=${gameIdData.id}`)

              setLoading(false)
            } catch (error: any) {
              console.error(error)
              setErrorMessage(error.message)
              setLoading(false)
            }
          }}
        >
          <ThemedText>Host Game</ThemedText>
        </ThemedPressable>
        <Link href="/account" asChild>
          <ThemedPressable secondary>
            <ThemedText>Account</ThemedText>
          </ThemedPressable>
        </Link>
      </Group>
    </ThemedView>
  )
}
