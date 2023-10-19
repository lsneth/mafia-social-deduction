import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import colors from '../styles/colors'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

export default function IconButton({
  disabled,
  onPress,
  icon,
}: {
  disabled?: boolean
  onPress: () => void
  icon: 'pencil'
}) {
  return (
    <View>
      <TouchableOpacity onPress={disabled ? () => {} : () => onPress()}>
        <Icon
          name={icon}
          color={colors.white}
          backgroundColor={disabled ? colors.gray : colors.red}
          size={25}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: { borderRadius: 25, width: 50, height: 50, textAlign: 'center', paddingTop: 11 },
})
