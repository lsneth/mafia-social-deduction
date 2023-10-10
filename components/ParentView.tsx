import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { ImageSourcePropType } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../styles/colors'

export default function ParentView({
  children,
  paddingTop = 80,
  backgroundImage,
  gradientValues = ['transparent', 'transparent'],
}: {
  children: JSX.Element | JSX.Element[]
  paddingTop?: number
  backgroundImage?: ImageSourcePropType
  gradientValues?: string[]
}) {
  const styles = StyleSheet.create({
    view: {
      height: '100%',
      flex: 1,
      paddingTop: paddingTop,
    },
    backgroundColor: {
      backgroundColor: colors.black,
    },
    backgroundImage: {
      height: '100%',
    },
  })

  return (
    <View>
      {/* if the consumer passes a background image and gradient values */}
      {backgroundImage && gradientValues && (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <LinearGradient colors={gradientValues} style={{ height: '100%' }}>
            <View style={styles.view}>{children}</View>
          </LinearGradient>
        </ImageBackground>
      )}

      {/* if the consumer passes a background image but not gradient values */}
      {backgroundImage && !gradientValues && (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <View style={styles.view}>{children}</View>
        </ImageBackground>
      )}

      {/* if the consumer does not pass a background image but does pass gradient values */}
      {!backgroundImage && gradientValues && (
        <LinearGradient colors={gradientValues} style={{ height: '100%' }}>
          <View style={[styles.view, styles.backgroundColor]}>{children}</View>
        </LinearGradient>
      )}

      {/* if the consumer passes neither a background image or gradient values */}
      {!backgroundImage && !gradientValues && <View style={[styles.view, styles.backgroundColor]}>{children}</View>}
    </View>
  )
}
