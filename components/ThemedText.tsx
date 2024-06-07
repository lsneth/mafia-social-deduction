import { Text, type TextProps } from 'react-native'

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'subtitle'
}

export function ThemedText({ className, type = 'default', ...rest }: ThemedTextProps) {
  return (
    <Text
      style={{ fontFamily: type === 'title' ? 'Oswald_700Bold' : 'CrimsonText_400Regular' }}
      className={`text-white ${
        type === 'title' ? 'text-7xl pt-5' : type === 'subtitle' ? 'text-3xl' : 'text-lg'
      } text-center ${className}`}
      {...rest}
    />
  )
}
