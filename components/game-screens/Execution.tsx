import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import { Pressable, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { mafiaWhite } from '@/constants/colors'
import { useState } from 'react'
import RoleComponent from '../RoleComponent'
import { roleImages } from '@/helpers/roleImages'
import { useProfile } from '@/providers/ProfileProvider'
import { useGame } from '@/providers/GameProvider'
import PlayerGrid from '../PlayerGrid'
import dayImage from '../../assets/images/day.png'
import ThemedPressable from '../ThemedPressable'
import { readyPlayer } from '@/services/game-services'
import useVotes from '@/hooks/useVote'
import Group from '../Group'
import Spacer from '../Spacer'

function Vote() {
  const { player } = useGame()
  const { voting, votedPlayer, errorMessage } = useVotes('execution')

  const selectedPlayerId = player!.selected_player_id
  const playerId = player!.profile_id
  const ready = player!.ready
  const votedPlayerName = votedPlayer?.name
  const votedPlayerRole = votedPlayer?.role

  return (
    <>
      <ThemedText type="title-sm">EXECUTION PHASE</ThemedText>
      <>
        <ThemedText>
          {voting
            ? 'Vote for the person you would like to execute.'
            : `${votedPlayerName} is a${votedPlayerRole === 'mafia' ? '' : 'n'} ${votedPlayerRole}!`}
        </ThemedText>
        <PlayerGrid voting={voting} />
        <Group style={{ opacity: selectedPlayerId || !voting ? 1 : 0 }}>
          <ThemedText>{errorMessage}</ThemedText>
          <ThemedPressable
            disabled={ready || (!selectedPlayerId && voting)} // if the player is already ready or hasn't selected a player yet during voting stage
            onPress={async () => {
              try {
                const { error } = await readyPlayer(playerId)
                if (error) throw error
              } catch (error) {
                console.error(error)
              }
            }}
            testID="vote-button"
          >
            <ThemedText>{ready ? 'Waiting for other players...' : voting ? 'Vote' : 'Confirm'}</ThemedText>
          </ThemedPressable>
          <Spacer />
        </Group>
      </>
    </>
  )
}

function GameHistory() {
  return <ThemedText type="title-sm">Game History</ThemedText>
}

export default function Execution() {
  const { sex } = useProfile()
  const { player } = useGame()
  const role = player!.role
  const [screen, setScreen] = useState<'vote' | 'history' | 'role'>('vote')
  const [bgImageSrc, setBgImageSrc] = useState(dayImage)
  return (
    <ThemedView
      bgImageSrc={bgImageSrc}
      fadeIn
      preFadeInAudio={require('../../assets/audio/sleepInvestigator.mp3')}
      fadeInAudio={require('../../assets/audio/wakeAll.mp3')}
      className="justify-between"
    >
      {screen === 'vote' ? <Vote /> : null}
      {screen === 'history' ? <GameHistory /> : null}
      {screen === 'role' ? <RoleComponent /> : null}

      <View className="-mx-5 -mb-5 flex flex-row bg-mafiaDarkGray">
        <Pressable
          className={`flex-1 items-center p-4 ${screen === 'vote' ? 'border-t-4 border-mafiaWhite' : ''}`}
          onPress={() => setScreen('vote')}
        >
          <MaterialIcons name="supervisor-account" size={24} color={mafiaWhite} />
        </Pressable>
        {/* // TODO: Implement game history */}
        {/* <Pressable
          className={`flex-1 items-center p-4 ${screen === 'history' ? 'border-b-4 border-mafiaWhite' : ''}`}
          onPress={() => setScreen('history')}
        >
          <MaterialIcons name="history" size={24} color={mafiaWhite} />
        </Pressable> */}
        <Pressable
          className={`flex-1 items-center p-4 ${screen === 'role' ? 'border-t-4 border-mafiaWhite' : ''}`}
          onPressIn={() => {
            setScreen('role')
            setBgImageSrc(roleImages[role][sex])
          }}
          onPressOut={() => {
            setScreen('vote')
            setBgImageSrc(dayImage)
          }}
        >
          <MaterialIcons name="person" size={24} color={mafiaWhite} />
        </Pressable>
      </View>
    </ThemedView>
  )
}
