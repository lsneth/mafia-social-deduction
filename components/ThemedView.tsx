import { ImageBackground, ImageSourcePropType, View, type ViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ThemedViewProps = ViewProps & {
  bgImageSrc?: ImageSourcePropType
}

export default function ThemedView({ bgImageSrc, className, ...rest }: ThemedViewProps): JSX.Element {
  const insets = useSafeAreaInsets()

  return bgImageSrc ? (
    <View className="flex-1 bg-mafiaBlack">
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
    </View>
  ) : (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      className="flex-1 bg-mafiaBlack"
    >
      <View className={`flex-1 items-center p-8 ${className}`} {...rest} />
    </View>
  )
}
