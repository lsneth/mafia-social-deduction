import { ImageBackground, ImageSourcePropType, View, type ViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ThemedViewProps = ViewProps & {
  bgImageSrc?: ImageSourcePropType
}

export default function ThemedView({ bgImageSrc, className, ...rest }: ThemedViewProps): JSX.Element {
  const insets = useSafeAreaInsets()

  return bgImageSrc ? (
    <View className="bg-mafiaBlack flex-1">
      <ImageBackground source={bgImageSrc} className="w-full h-full">
        <View
          style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
          className="flex-1"
        >
          <View className={`flex-1 p-8 items-center ${className}`} {...rest} />
        </View>
      </ImageBackground>
    </View>
  ) : (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      className="bg-mafiaBlack flex-1"
    >
      <View className={`flex-1 p-8 items-center ${className}`} {...rest} />
    </View>
  )
}
