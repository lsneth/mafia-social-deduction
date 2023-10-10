import React, { useState } from 'react'
import { ImageBackground, View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import styles from '../styles/styles'
import { LinearGradient } from 'expo-linear-gradient'

export default function Home() {
  return (
    <View>
      <ImageBackground source={require('../assets/background-images/mafia.png')} style={{ height: '100%' }}>
        <LinearGradient colors={['#000000', 'transparent', '#000000']} style={{ height: '100%' }}>
          <View style={styles.paddingLarge}>
            <Text style={[styles.baseText, styles.center, styles.heading]}>MAFIA</Text>
            <Text style={[styles.baseText, styles.center, styles.subheading]}>Social Deduction</Text>
          </View>
          <View style={[styles.bottom, styles.paddingBottomMedium]}>
            <Button
              title="CREATE ACCOUNT"
              titleStyle={styles.baseText}
              buttonStyle={styles.baseButton}
              // onPress={() => signInWithEmail()}
            />
            <Button
              title="LOG IN"
              titleStyle={styles.baseText}
              buttonStyle={styles.baseButton}
              // onPress={() => signUpWithEmail()}
            />
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}
