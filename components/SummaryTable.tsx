import { View } from 'react-native'
import { ThemedText } from './ThemedText'
import { useGame } from '@/providers/GameProvider'
import getRoleCounts from '@/helpers/getRoleCounts'

export default function SummaryTable() {
  const { players } = useGame()
  const playerCount = players?.length ?? 0
  const { mafiaCount, investigatorCount, innocentCount } = getRoleCounts(playerCount)

  return (
    <View className="w-full max-w-sm">
      <View className="items-center rounded-t-lg bg-mafiaDarkGray px-2 py-1">
        <ThemedText>{`${playerCount} Player${playerCount !== 1 ? 's' : ''}`}</ThemedText>
      </View>
      <View className="flex flex-row">
        <View className="w-1/3 items-center rounded-bl-lg bg-mafiaAccent px-2 py-1">
          <ThemedText>{mafiaCount}</ThemedText>
          <ThemedText>Mafia</ThemedText>
        </View>
        <View className="w-1/3 items-center bg-blue-950 px-2 py-1">
          <ThemedText>{investigatorCount}</ThemedText>
          <ThemedText>{`Investigator${investigatorCount !== 1 ? 's' : ''}`}</ThemedText>
        </View>
        <View className="w-1/3 items-center rounded-br-lg bg-yellow-900 px-2 py-1">
          <ThemedText>{innocentCount}</ThemedText>
          <ThemedText>{`Innocent${innocentCount !== 1 ? 's' : ''}`}</ThemedText>
        </View>
      </View>
    </View>
  )
}
