import { useGame } from '@/providers/GameProvider'
import ThemedPressable from './ThemedPressable'
import { leaveGame } from '@/services/game-services'
import { useProfile } from '@/providers/ProfileProvider'
import { router } from 'expo-router'
import { ThemedText } from './ThemedText'

export default function LeaveGamePressable({ secondary = false }: { secondary?: boolean }) {
  const { unsubscribeFromGame } = useGame()
  const { id: profileId } = useProfile()

  return (
    <ThemedPressable
      secondary={secondary}
      onPress={async () => {
        try {
          const res = await unsubscribeFromGame()
          if (res !== 'ok') throw res

          const { error: leaveError } = await leaveGame(profileId)
          if (leaveError) throw leaveError

          router.replace('/home')
        } catch (error) {
          console.error(error)
        }
      }}
      testID="leave-game-button"
    >
      <ThemedText>Leave Game</ThemedText>
    </ThemedPressable>
  )
}
