import { useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import ThemedPressable from '@/components/ThemedPressable'
import ThemedView from '@/components/ThemedView'
import ThemedTextInput from '@/components/ThemedTextInput'
import Spacer from '@/components/Spacer'

export default function JoinScreen() {
  const [roomId, setRoomId] = useState<string>('')

  return (
    <ThemedView className="justify-center">
      <ThemedText>Enter a code to join a room.</ThemedText>
      <Spacer />
      <ThemedTextInput onChangeText={setRoomId} value={roomId} placeholder="XXXXXX" testID="room-id-input" />
      <ThemedPressable onPress={() => console.log('join room')} testID="join-room-button">
        <ThemedText>Join Room</ThemedText>
      </ThemedPressable>
      <Spacer size={20} />
    </ThemedView>
  )
}
