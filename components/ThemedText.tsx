import { Text, type TextProps } from 'react-native'

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'subtitle'
  underline?: boolean
}

export function ThemedText({ className, type = 'default', underline = false, ...rest }: ThemedTextProps): JSX.Element {
  return (
    <Text
      style={{ fontFamily: type === 'title' ? 'Oswald_700Bold' : 'CrimsonText_400Regular' }}
      className={`text-mafiaWhite ${
        type === 'title' ? 'text-7xl pt-5' : type === 'subtitle' ? 'text-3xl' : 'text-lg'
      } ${underline ? 'underline' : ''} ${className}`}
      {...rest}
    />
  )
}
