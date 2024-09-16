import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import { Pressable, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { mafiaWhite } from '@/constants/colors'
import { useEffect, useState } from 'react'
import RoleComponent from '../RoleComponent'
import { roleImages } from '@/helpers/roleImages'
import { useProfile } from '@/providers/ProfileProvider'
import { useGame } from '@/providers/GameProvider'
import PlayerGrid from '../PlayerGrid'
import dayImage from '../../assets/images/day.png'
import ThemedPressable from '../ThemedPressable'
import { killPlayer, readyPlayer, updateRoundCount } from '@/services/game-services'
import useVote from '@/hooks/useVote'
import Group from '../Group'
import Spacer from '../Spacer'
import { Player } from '@/types/game-types'
import Announcement from '../Announcement'

function Voting({
  voting,
  votedPlayer,
  errorMessage,
  bgImageSrc,
  updateBgImageSrc,
}: {
  voting: boolean
  votedPlayer: Player | undefined
  errorMessage: string | null
  bgImageSrc: any
  updateBgImageSrc: (imgSrc: any) => void
}) {
  const [screen, setScreen] = useState<'vote' | 'history' | 'role'>('vote')
  const { player } = useGame()
  const { sex } = useProfile()

  const role = player!.role
  const isAlive = player!.is_alive
  const selectedPlayerId = player!.selected_player_id
  const playerId = player!.profile_id
  const ready = player!.ready

  return (
    <>
      {screen === 'vote' ? (
        <>
          <>
            <ThemedText type="title-sm" dropShadow>
              EXECUTION PHASE
            </ThemedText>
            <>
              <Spacer />
              <ThemedText dropShadow>{isAlive ? 'Vote for the person you would like to execute.' : ''}</ThemedText>
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
        </>
      ) : null}
      {screen === 'history' ? <ThemedText type="title-sm">Game History</ThemedText> : null}
      {screen === 'role' ? <RoleComponent /> : null}

      {/* Bottom Nav*/}
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
            updateBgImageSrc(roleImages[role][sex])
          }}
          onPressOut={() => {
            setScreen('vote')
            updateBgImageSrc(dayImage)
          }}
        >
          <MaterialIcons name="person" size={24} color={mafiaWhite} />
        </Pressable>
      </View>
    </>
  )
}

export default function Execution() {
  const { players, player, game } = useGame()
  const { voting, votedPlayer, errorMessage } = useVote('execution') // this is the magic here, it handles the voting and phase update
  const [bgImageSrc, setBgImageSrc] = useState(dayImage)
  const [hideMurderAnnouncement, setHideMurderAnnouncement] = useState<boolean>(false)
  const [murderedPlayer] = useState(players!.find((player) => player.is_alive && player.has_been_murdered))

  const roundCount = game!.round_count
  const livingInvestigators = players!.filter((player) => player.is_alive && player.role === 'investigator')
  const murderedPlayerName = murderedPlayer?.name ?? null
  const murderedPlayerRole = murderedPlayer?.role ?? null
  const isHost = game!.host_id === player!.profile_id
  const votedPlayerName = votedPlayer?.name
  const votedPlayerRole = votedPlayer?.role
  const ready = player!.ready

  function updateBgImageSrc(imgSrc: any) {
    setBgImageSrc(imgSrc)
  }

  useEffect(() => {
    // this is just to put into effect the choices made during the night, should only run once
    async function newRound() {
      if (isHost && !hideMurderAnnouncement) {
        // only tries to run if the announcement is showing
        // kill murdered player
        try {
          const { error } = await killPlayer(murderedPlayer!.profile_id)
          if (error) throw error
        } catch (error) {
          console.error(error)
        }

        // update round count
        try {
          const { error } = await updateRoundCount(game!.id)
          if (error) throw error
        } catch (error) {
          console.error(error)
        }
      }
    }

    newRound()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we only want to run this once
  }, [])

  return (
    <ThemedView
      bgImageSrc={bgImageSrc}
      fadeIn
      preFadeInAudio={
        roundCount === 0 || livingInvestigators.length > 0
          ? require('../../assets/audio/sleepMafia.mp3')
          : require('../../assets/audio/sleepInvestigator.mp3')
      }
      fadeInAudio={require('../../assets/audio/wakeAll.mp3')}
      className="justify-between"
    >
      {voting && !hideMurderAnnouncement ? (
        <Announcement
          announcementTitle={`${murderedPlayerName?.toUpperCase()} WAS MURDERED!`}
          announcementSubtitle={`${murderedPlayerName} was an ${murderedPlayerRole}. They may no longer speak, vote, or participate in any way.`}
          onActionButtonPress={() => setHideMurderAnnouncement(true)}
          actionButtonText="Dismiss"
        />
      ) : null}
      {voting && hideMurderAnnouncement ? (
        <Voting
          voting={voting}
          votedPlayer={votedPlayer}
          errorMessage={errorMessage}
          bgImageSrc={bgImageSrc}
          updateBgImageSrc={updateBgImageSrc}
        />
      ) : null}
      {!voting ? (
        <Announcement
          announcementTitle={`${votedPlayerName} was executed!`}
          announcementSubtitle={`${votedPlayerName} was an ${votedPlayerRole}. They may no longer speak, vote, or participate in any way.`}
          onActionButtonPress={
            ready
              ? () => {}
              : () => {
                  readyPlayer(player!.profile_id)
                }
          }
          actionButtonText={ready ? 'Waiting for other players...' : 'Confirm'}
        />
      ) : null}
    </ThemedView>
  )
}
