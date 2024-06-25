import { AVPlaybackSource, Audio } from 'expo-av'
import { useEffect, useState } from 'react'

export default function useAudio(audio: AVPlaybackSource, callback?: () => void) {
  const [sound, setSound] = useState<Audio.Sound>()

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(audio)
    setSound(sound)
    await sound.playAsync()
  }

  sound?.setOnPlaybackStatusUpdate((playbackStatus) => {
    if ('didJustFinish' in playbackStatus) {
      if (playbackStatus.didJustFinish) {
        callback && callback()
      }
    }
  })

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return playSound
}
