import { ImageBackground, ImageSourcePropType, View, type ViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ThemedViewProps = ViewProps & {
  bgImageSrc?: ImageSourcePropType
}

export default function ThemedView({ bgImageSrc, className, ...rest }: ThemedViewProps) {
  const insets = useSafeAreaInsets()

  return bgImageSrc ? (
    <View className="bg-black flex-1">
      <ImageBackground source={bgImageSrc} className="w-full h-full bg-center">
        <View
          style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
          className="flex-1"
        >
          <View className={`flex-1 p-8 ${className}`} {...rest} />
        </View>
      </ImageBackground>
    </View>
  ) : (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      className="bg-black flex-1 items-center"
      {...rest}
    />
  )
}
