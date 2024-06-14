import { Platform, Switch, SwitchProps, View } from 'react-native'
import colors from '@/constants/colors'
import { ThemedText } from './ThemedText'

type ToggleProps = SwitchProps & {
  trueDisplayValue: string
  falseDisplayValue: string
}

export default function Toggle({ trueDisplayValue, falseDisplayValue, ...rest }: ToggleProps): JSX.Element {
  return (
    <View className="flex flex-row items-center">
      <ThemedText>{falseDisplayValue}</ThemedText>
      <Switch
        trackColor={{ false: colors.mafiaGray, true: colors.mafiaGray }}
        thumbColor={colors.mafiaAccent}
        ios_backgroundColor={colors.mafiaGray}
        className="m-3"
        {...Platform.select({
          web: {
            activeThumbColor: colors.mafiaAccent,
          },
        })}
        {...rest}
      />
      <ThemedText>{trueDisplayValue}</ThemedText>
    </View>
  )
}
