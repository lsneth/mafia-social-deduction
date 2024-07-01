import useAudio from '@/hooks/useAudio'
import { useGame } from '@/providers/GameProvider'
import { AVPlaybackSource } from 'expo-av'
import { useEffect } from 'react'
import { ImageBackground, ImageSourcePropType, View, type ViewProps } from 'react-native'
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ThemedViewProps = ViewProps & {
  bgImageSrc?: ImageSourcePropType
  fadeIn?: boolean
  fadeInAudio?: AVPlaybackSource | null
  preFadeInAudio?: AVPlaybackSource | null
}

export default function ThemedView({
  bgImageSrc,
  className,
  fadeIn = false,
  preFadeInAudio = null,
  fadeInAudio = null,
  ...rest
}: ThemedViewProps): JSX.Element {
  const insets = useSafeAreaInsets()
  const opacity = useSharedValue(fadeIn ? 0 : 1)
  const playFadeInAudio = useAudio(fadeInAudio)
  const playPreFadeInAudio = useAudio(preFadeInAudio)
  const { game, player } = useGame()
  const isHost = game?.host_id === player?.profile_id

  function startFadeIn() {
    opacity.value = withTiming(1, { duration: 5000 })
  }

  useEffect(() => {
    if (preFadeInAudio) {
      isHost && playPreFadeInAudio() // we only want to play the audio on the host's device
      setTimeout(() => {
        fadeInAudio && isHost && playFadeInAudio()
        startFadeIn()
      }, 5000)
    } else {
      fadeInAudio && isHost && playFadeInAudio()
      startFadeIn()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps -- we only ever want to run this once
  }, [])

  return bgImageSrc ? (
    <Animated.View className="flex-1 bg-mafiaBlack" style={{ opacity }}>
      <ImageBackground source={bgImageSrc} className="h-full w-full">
        <View
          style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
          className="flex-1"
        >
          <View className={`flex-1 items-center p-8 ${className}`} {...rest} />
        </View>
      </ImageBackground>
    </Animated.View>
  ) : (
    <Animated.View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        opacity,
      }}
      className="flex-1 bg-mafiaBlack"
    >
      <View className={`flex-1 items-center p-8 ${className}`} {...rest} />
    </Animated.View>
  )
}
