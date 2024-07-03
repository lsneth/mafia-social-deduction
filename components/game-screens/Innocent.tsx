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

function Vote() {
  return <ThemedText type="title-sm">INNOCENT PHASE</ThemedText>
}
function GameHistory() {
  return <ThemedText>Game History</ThemedText>
}

export default function Innocent() {
  const { sex } = useProfile()
  const { player } = useGame()
  const role = player!.role
  const [screen, setScreen] = useState<'vote' | 'history' | 'role'>('vote')
  const dayImage = require('../../assets/images/day.png')
  const [bgImageSrc, setBgImageSrc] = useState(dayImage)
  return (
    <ThemedView bgImageSrc={bgImageSrc} className="justify-between">
      {screen === 'vote' ? <Vote /> : null}
      {screen === 'history' ? <GameHistory /> : null}
      {screen === 'role' ? <RoleComponent /> : null}

      <View className="flex w-full max-w-sm flex-row bg-mafiaDarkGray">
        <Pressable
          className={`flex-1 items-center p-4 ${screen === 'vote' ? 'border-b-4 border-mafiaWhite' : ''}`}
          onPress={() => setScreen('vote')}
        >
          <MaterialIcons name="supervisor-account" size={24} color={mafiaWhite} />
        </Pressable>
        <Pressable
          className={`flex-1 items-center p-4 ${screen === 'history' ? 'border-b-4 border-mafiaWhite' : ''}`}
          onPress={() => setScreen('history')}
        >
          <MaterialIcons name="history" size={24} color={mafiaWhite} />
        </Pressable>
        <Pressable
          className={`flex-1 items-center p-4 ${screen === 'role' ? 'border-b-4 border-mafiaWhite' : ''}`}
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
