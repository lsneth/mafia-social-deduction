import { useGame } from '@/providers/GameProvider'
import { Player } from '@/types/game-types'
import { FlatList, Pressable, View } from 'react-native'
import { ThemedText } from './ThemedText'
import Spacer from './Spacer'
import { selectPlayer } from '@/services/game-services'
import { useEffect, useState } from 'react'

function PlayerCard({
  cardPlayer,
  voting,
  selected,
  onSelect,
}: {
  cardPlayer: Player
  voting: boolean
  selected: boolean
  onSelect: () => void
}) {
  const { players, player, game } = useGame()
  // state for snappy UI updates before realtime catches up // TODO: make the unselect vote count update snappier too
  const [newVoteCount, setNewVoteCount] = useState<number | null>(
    players?.filter((player) => player.selected_player_id === cardPlayer.profile_id).length ?? 0,
  )
  const phase = game?.phase
  const role = cardPlayer.role

  // logic flags
  const isCurrentPlayer = cardPlayer.profile_id === player?.profile_id
  const isInvestigator = cardPlayer.role === 'investigator'
  const isMafia = cardPlayer.role === 'mafia'
  const isAlive = cardPlayer.is_alive
  const isInvestigatorPhase = phase === 'investigator'
  const hasBeenInvestigated = cardPlayer.has_been_investigated
  const hasBeenMurdered = cardPlayer.has_been_murdered

  // compound logic flags
  let showRole
  let showVoteCount
  switch (phase) {
    case 'execution':
      showVoteCount = voting && isAlive
      showRole = !isAlive
      break
    case 'mafia':
      showVoteCount = voting && isAlive && !isMafia
      showRole = !isAlive || isMafia
      break
    case 'investigator':
      showVoteCount = voting && isAlive && !isInvestigator && !hasBeenInvestigated
      showRole = !isAlive || isInvestigator || hasBeenInvestigated
      break

    default:
      showVoteCount = false
      showRole = false
  }
  const selectable = showVoteCount && !isCurrentPlayer
  const roleBgColor = role === 'mafia' ? 'bg-mafiaRed' : role === 'investigator' ? 'bg-mafiaBlue' : 'bg-mafiaYellow'
  const bgColor =
    (isInvestigatorPhase && showRole) || !isAlive ? roleBgColor : selectable ? 'bg-mafiaDarkGray' : 'bg-mafiaGray'
  const bgBorder = !isAlive ? (hasBeenMurdered ? 'bg-mafiaRed' : 'bg-mafiaYellow') : selected ? 'bg-mafiaGray' : ''

  useEffect(() => {
    // make sure to keep UI votes in sync with master in db once realtime catches up
    setNewVoteCount(players?.filter((player) => player.selected_player_id === cardPlayer.profile_id).length ?? 0)
  }, [cardPlayer.profile_id, players])

  return (
    <Pressable
      className={`flex-1 rounded-lg ${bgBorder ? bgBorder : bgColor} p-1`}
      style={{ maxWidth: '32%' }}
      disabled={!selectable || selected}
      onPress={() => {
        // update state for snappy UI updates before realtime catches up
        setNewVoteCount((prev) => (prev !== null ? prev + 1 : null))
        onSelect()
      }}
    >
      <View className={`min-h-36 ${bgColor} h-full w-full justify-center rounded`}>
        <ThemedText>{isCurrentPlayer ? 'Me' : cardPlayer.name}</ThemedText>
        {showVoteCount ? <ThemedText>{newVoteCount}</ThemedText> : null}
        {showRole ? <ThemedText>{cardPlayer.role}</ThemedText> : null}
      </View>
    </Pressable>
  )
}

export default function PlayerGrid({ voting = true }: { voting?: boolean }) {
  const { players, player } = useGame()

  // state for snappy UI updates before realtime catches up
  const [newSelectedPlayerId, setNewSelectedPlayerId] = useState<string | null>(null)

  useEffect(() => {
    // make sure to keep selectedPlayerId in sync with master in db once realtime catches up
    setNewSelectedPlayerId(player?.selected_player_id ?? null)
  }, [player?.selected_player_id])

  return (
    <FlatList
      data={players}
      renderItem={({ item }) => (
        <PlayerCard
          cardPlayer={item}
          voting={voting}
          selected={item.profile_id === newSelectedPlayerId} // state for snappy UI updates before realtime catches up
          onSelect={async () => {
            setNewSelectedPlayerId(item.profile_id) // update state for snappy UI updates before realtime catches up
            try {
              const { error } = await selectPlayer(player?.profile_id ?? '', item.profile_id ?? '') // update master in db
              if (error) throw error
            } catch (error) {
              console.error(error)
            }
          }}
        />
      )}
      numColumns={3}
      keyExtractor={(player) => player.profile_id}
      columnWrapperStyle={{ gap: 8, height: 100 }}
      ItemSeparatorComponent={Spacer}
      // contentContainerStyle={{ flex: 1, justifyContent: 'center' }} // TODO: figure out how to justify-center without hiding top of grid on small screens
      style={{ width: '100%' }}
    />
  )
}
