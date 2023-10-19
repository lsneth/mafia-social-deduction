import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { ImageSourcePropType } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../styles/colors'
import Separator, { SeparatorSize } from './Separator'

export default function ParentView({
  children,
  paddingTop = 80,
  backgroundImage,
  gradientValues,
}: {
  children: JSX.Element | JSX.Element[]
  paddingTop?: SeparatorSize
  backgroundImage?: ImageSourcePropType
  gradientValues?: string[]
}) {
  if (backgroundImage && gradientValues)
    return (
      <ImageBackground source={backgroundImage}>
        <LinearGradient colors={gradientValues}>
          <View style={styles.viewHeightOnly}>
            <Separator size={paddingTop} />
            {children}
          </View>
        </LinearGradient>
      </ImageBackground>
    )
  else if (backgroundImage && !gradientValues)
    return (
      <ImageBackground source={backgroundImage}>
        <View style={styles.view}>
          <Separator size={paddingTop} />
          {children}
        </View>
      </ImageBackground>
    )
  else if (!backgroundImage && gradientValues)
    return (
      <LinearGradient colors={gradientValues}>
        <View style={styles.view}>
          <Separator size={paddingTop} />
          {children}
        </View>
      </LinearGradient>
    )
  else
    return (
      <View style={styles.view}>
        <Separator size={paddingTop} />
        {children}
      </View>
    )
}

const styles = StyleSheet.create({
  view: {
    height: '100%',
    backgroundColor: colors.black,
  },
  viewHeightOnly: {
    height: '100%',
  },
})
