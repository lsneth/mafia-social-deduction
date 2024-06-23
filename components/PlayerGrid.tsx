import { useGame } from '@/providers/GameProvider'
import { Player } from '@/types/game-types'
import { FlatList, View } from 'react-native'
import { ThemedText } from './ThemedText'
import Spacer from './Spacer'

function PlayerCard({ player }: { player: Player }) {
  return (
    <View className="flex-1 items-center justify-center rounded-lg bg-mafiaDarkGray" style={{ maxWidth: '32%' }}>
      <View className="min-h-36">
        <ThemedText>{player.name}</ThemedText>
      </View>
    </View>
  )
}

export default function PlayerGrid() {
  const { players } = useGame()

  return (
    <View className="w-full max-w-sm">
      <FlatList
        data={players}
        renderItem={({ item }) => <PlayerCard player={item} />}
        numColumns={3}
        keyExtractor={(player) => player.profile_id}
        columnWrapperStyle={{ gap: 8, height: 100 }}
        ItemSeparatorComponent={Spacer}
      />
    </View>
  )
}
