import { useGame } from '@/providers/GameProvider'
import { Player } from '@/types/game-types'
import { FlatList, Pressable, View } from 'react-native'
import { ThemedText } from './ThemedText'
import Spacer from './Spacer'
import { selectPlayer } from '@/services/game-services'

function PlayerCard({ cardPlayer, selectable }: { cardPlayer: Player; selectable: boolean }) {
  const { player, players } = useGame()
  const selected = cardPlayer.profile_id === player?.selected_player_id
  const cardPlayerIsPlayer = cardPlayer.profile_id === player?.profile_id
  const voteCount = players?.filter((player) => player.selected_player_id === cardPlayer.profile_id).length

  return (
    <Pressable
      className={`flex-1 items-center justify-center rounded-lg ${selected ? 'bg-mafiaDarkGray' : 'bg-mafiaGray'}`}
      style={{ maxWidth: '32%' }}
      disabled={cardPlayerIsPlayer || !selectable}
      onPress={async () => {
        try {
          const { error } = await selectPlayer(player?.profile_id ?? '', cardPlayer?.profile_id ?? '')
          if (error) throw error
        } catch (error) {
          console.error(error)
        }
      }}
    >
      <View className="min-h-36">
        <ThemedText>{cardPlayer.name}</ThemedText>
        <ThemedText>{voteCount}</ThemedText>
      </View>
    </Pressable>
  )
}

export default function PlayerGrid({ selectable = true }: { selectable?: boolean }) {
  const { players } = useGame()

  return (
    <View className="w-full max-w-sm">
      <FlatList
        data={players}
        renderItem={({ item }) => <PlayerCard cardPlayer={item} selectable={selectable} />}
        numColumns={3}
        keyExtractor={(player) => player.profile_id}
        columnWrapperStyle={{ gap: 8, height: 100 }}
        ItemSeparatorComponent={Spacer}
      />
    </View>
  )
}
