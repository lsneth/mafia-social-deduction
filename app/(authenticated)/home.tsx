import { Link, router } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import ThemedPressable from '@/components/ThemedPressable'
import ThemedView from '@/components/ThemedView'
import Group from '@/components/Group'
import backgroundImage from '../../assets/images/mafia-bg.png'
import { useProfile } from '@/providers/ProfileProvider'
import { hostGame } from '@/services/game-services'
import { useState } from 'react'
import ThemedActivityIndicator from '@/components/ThemedActivityIndicator'
import getUserFriendlyErrMsg from '@/helpers/getUserFriendlyErrMsg'
import Spacer from '@/components/Spacer'

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
        <Spacer />
        <ThemedPressable
          onPress={async () => {
            setLoading(true)
            try {
              const {
                data: { gameId },
                error,
              } = await hostGame(profileId, playerName ?? '')
              if (error) throw error

              // navigate to lobby
              router.replace(`/game?id=${gameId}`)
            } catch (error: any) {
              console.error(error)
              setErrorMessage(getUserFriendlyErrMsg(error.message))
            } finally {
              setLoading(false)
            }
          }}
        >
          <ThemedText>Host Game</ThemedText>
        </ThemedPressable>
        <Spacer />
        <Link href="/account" asChild>
          <ThemedPressable secondary>
            <ThemedText>Account</ThemedText>
          </ThemedPressable>
        </Link>
      </Group>
    </ThemedView>
  )
}
