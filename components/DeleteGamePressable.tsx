import ThemedPressable from './ThemedPressable'
import { deleteGame } from '@/services/game-services'
import { useProfile } from '@/providers/ProfileProvider'
import { router } from 'expo-router'
import { ThemedText } from './ThemedText'

export default function DeleteGamePressable({ secondary = false }: { secondary?: boolean }) {
  const { id: profileId } = useProfile()

  return (
    <ThemedPressable
      secondary={secondary}
      onPress={async () => {
        try {
          const { error } = await deleteGame(profileId)
          if (error) throw error

          router.replace('/home')
        } catch (error) {
          console.error(error)
        }
      }}
      testID="delete-game-button"
    >
      <ThemedText>Delete Game</ThemedText>
    </ThemedPressable>
  )
}
