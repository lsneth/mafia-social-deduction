import { Text, type TextProps } from 'react-native'

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'title-sm' | 'subtitle'
  underline?: boolean
}

export function ThemedText({ className, type = 'default', underline = false, ...rest }: ThemedTextProps): JSX.Element {
  return (
    <Text
      style={{
        fontFamily: type === 'title' || type === 'title-sm' ? 'Oswald_700Bold' : 'CrimsonText_400Regular',
      }}
      className={`text-mafiaWhite ${type === 'title' ? 'pt-5 text-7xl' : type === 'title-sm' ? 'pt-1 text-5xl' : type === 'subtitle' ? 'text-3xl' : 'text-lg'} ${underline ? 'underline' : ''} text-center ${className}`}
      {...rest}
    />
  )
}
