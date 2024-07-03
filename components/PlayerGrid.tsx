import { useGame } from '@/providers/GameProvider'
import { Player } from '@/types/game-types'
import { FlatList, Pressable, View } from 'react-native'
import { ThemedText } from './ThemedText'
import Spacer from './Spacer'
import { selectPlayer } from '@/services/game-services'
import { useEffect, useState } from 'react'

function PlayerCard({
  cardPlayer,
  gridIsSelectable,
  selected,
  onSelect,
}: {
  cardPlayer: Player
  gridIsSelectable: boolean
  selected: boolean
  onSelect: () => void
}) {
  const { players, player, game } = useGame()
  // state for snappy UI updates before realtime catches up // TODO: make the unselect vote count update snappier
  const [newVoteCount, setNewVoteCount] = useState<number | null>(
    players?.filter((player) => player.selected_player_id === cardPlayer.profile_id).length ?? 0,
  )

  // simple logic flags
  const isCurrentPlayer = cardPlayer.profile_id === player?.profile_id
  const hasBeenInvestigated = cardPlayer.has_been_investigated
  const hasBeenKilled = cardPlayer.has_been_killed
  const isInvestigator = cardPlayer.role === 'investigator'
  const isMafia = cardPlayer.role === 'mafia'
  const phase = game?.phase
  const role = cardPlayer.role
  const isAlive = cardPlayer.is_alive

  // compound logic flags
  const isInvestigatorPhase = phase === 'investigator'
  const isMafiaPhase = phase === 'mafia'
  const isLobbyPhase = phase === 'lobby'
  const investigatorPhaseShowVoteCount = isInvestigatorPhase ? !hasBeenInvestigated && !isInvestigator : true
  const investigatorPhaseShowRole = isInvestigatorPhase ? hasBeenInvestigated || isInvestigator : true
  const mafiaPhaseShowVoteCount = isMafiaPhase ? !isMafia : true
  const mafiaPhaseShowRole = isMafiaPhase ? isMafia : true
  const lobbyPhaseShowVoteCount = isLobbyPhase ? false : true
  const lobbyPhaseShowRole = isLobbyPhase ? false : true

  // UI logic && logic flags
  const showVoteCount =
    gridIsSelectable && isAlive && investigatorPhaseShowVoteCount && mafiaPhaseShowVoteCount && lobbyPhaseShowVoteCount
  const selectable = showVoteCount && !isCurrentPlayer
  const showRole = !isAlive || (investigatorPhaseShowRole && mafiaPhaseShowRole && lobbyPhaseShowRole)
  const roleBgColor = role === 'mafia' ? 'bg-mafiaRed' : role === 'investigator' ? 'bg-mafiaBlue' : 'bg-mafiaYellow'
  const bgColor =
    (isInvestigatorPhase && showRole) || !isAlive ? roleBgColor : selectable ? 'bg-mafiaDarkGray' : 'bg-mafiaGray'
  const border = !isAlive
    ? hasBeenKilled
      ? 'border-4 border-mafiaRed'
      : 'border-4 border-mafiaYellow'
    : selected
      ? 'border-4 border-mafiaGray'
      : ''

  useEffect(() => {
    // make sure to keep UI votes in sync with master in db once realtime catches up
    setNewVoteCount(players?.filter((player) => player.selected_player_id === cardPlayer.profile_id).length ?? 0)
  }, [cardPlayer.profile_id, players])

  return (
    <Pressable
      className={`flex-1 items-center justify-center rounded-lg ${bgColor} ${border}`}
      style={{ maxWidth: '32%' }}
      disabled={!selectable || selected || cardPlayer.has_been_investigated === true}
      onPress={() => {
        // update state for snappy UI updates before realtime catches up
        setNewVoteCount((prev) => (prev !== null ? prev + 1 : null))
        onSelect()
      }}
    >
      <View className="min-h-36">
        <ThemedText>{isCurrentPlayer ? 'Me' : cardPlayer.name}</ThemedText>
        {showVoteCount ? <ThemedText>{newVoteCount}</ThemedText> : null}
        {showRole ? <ThemedText>{cardPlayer.role}</ThemedText> : null}
      </View>
    </Pressable>
  )
}

export default function PlayerGrid({ selectable = true }: { selectable?: boolean }) {
  const { players, player } = useGame()

  // state for snappy UI updates before realtime catches up
  const [newSelectedPlayerId, setNewSelectedPlayerId] = useState<string | null>(null)

  useEffect(() => {
    // make sure to keep selectedPlayerId in sync with master in db once realtime catches up
    setNewSelectedPlayerId(player?.selected_player_id ?? null)
  }, [player?.selected_player_id])

  return (
    <View className="w-full max-w-sm">
      <FlatList
        data={players}
        renderItem={({ item }) => (
          <PlayerCard
            cardPlayer={item}
            gridIsSelectable={selectable}
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
      />
    </View>
  )
}
