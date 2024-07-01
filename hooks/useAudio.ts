import { AVPlaybackSource, Audio } from 'expo-av'
import { useEffect, useState } from 'react'

export default function useAudio(audio: AVPlaybackSource | null, callback?: () => void) {
  const [sound, setSound] = useState<Audio.Sound>()

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  if (!audio) {
    return async () => {}
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(audio!) // we know audio is not null here because we check it above
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

  return playSound
}
