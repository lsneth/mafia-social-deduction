import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { ImageSourcePropType } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Separator, { SeparatorSize } from './Separator'

export default function ParentView({
  children,
  paddingTop = 80,
  backgroundImage,
  gradientValues,
  resizeMode = 'cover',
}: {
  children: JSX.Element | JSX.Element[]
  paddingTop?: SeparatorSize
  backgroundImage?: ImageSourcePropType
  gradientValues?: string[]
  resizeMode?: 'cover' | 'contain'
}) {
  if (backgroundImage && gradientValues)
    return (
      <View style={{ backgroundColor: 'black' }}>
        <ImageBackground source={backgroundImage} resizeMode={resizeMode}>
          <LinearGradient colors={gradientValues}>
            <View style={styles.viewHeightOnly}>
              <Separator size={paddingTop} />
              {children}
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    )
  else if (backgroundImage && !gradientValues)
    return (
      <View style={{ backgroundColor: 'black' }}>
        <ImageBackground source={backgroundImage} resizeMode={resizeMode}>
          <View style={styles.view}>
            <Separator size={paddingTop} />
            {children}
          </View>
        </ImageBackground>
      </View>
    )
  else if (!backgroundImage && gradientValues)
    return (
      <View style={{ backgroundColor: 'black' }}>
        <LinearGradient colors={gradientValues}>
          <View style={styles.view}>
            <Separator size={paddingTop} />
            {children}
          </View>
        </LinearGradient>
      </View>
    )
  else
    return (
      <View style={{ backgroundColor: 'black' }}>
        <View style={styles.view}>
          <Separator size={paddingTop} />
          {children}
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  view: {
    height: '100%',
    // backgroundColor: colors.black,
  },
  viewHeightOnly: {
    height: '100%',
  },
})
