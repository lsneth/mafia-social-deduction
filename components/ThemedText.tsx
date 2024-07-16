import { mafiaBlack } from '@/constants/colors'
import { Text, type TextProps } from 'react-native'

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'title-sm' | 'subtitle'
  underline?: boolean
  dropShadow?: boolean
}

export function ThemedText({
  className,
  type = 'default',
  underline = false,
  dropShadow,
  ...rest
}: ThemedTextProps): JSX.Element {
  return (
    <Text
      style={{
        fontFamily: type === 'title' || type === 'title-sm' ? 'Oswald_700Bold' : 'CrimsonText_400Regular',
        ...(dropShadow
          ? {
              textShadowColor: mafiaBlack,
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 3,
            }
          : {}),
      }}
      className={`text-mafiaWhite ${type === 'title' ? 'pt-2 text-7xl' : type === 'title-sm' ? 'pt-2 text-5xl' : type === 'subtitle' ? 'text-3xl' : 'text-lg'} ${underline ? 'underline' : ''} text-center ${className}`}
      {...rest}
    />
  )
}
