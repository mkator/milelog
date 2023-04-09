import React, {useEffect} from 'react'
import {SafeAreaView, StyleSheet} from 'react-native'
import BottomTabNavigator from './src/navigators/BottomTabNavigator'
import {ActionSheetProvider} from '@expo/react-native-action-sheet'
import Toast, {BaseToast} from 'react-native-toast-message'
import SplashScreen from 'react-native-splash-screen'
import {colors, fontSize, fonts, screenSize} from './src/styles'

const text1Style = {
  fontSize: fontSize.s,
  fontFamily: fonts.light,
}
const text2Style = {
  fontSize: fontSize.xs,
  fontFamily: fonts.light,
}

const toastConfig = {
  info: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.primary,
        height: screenSize.fullHeight * 0.2,
      }}
      text1Style={text1Style}
      text2Style={text2Style}
      text1NumberOfLines={0}
      text2NumberOfLines={0}
    />
  ),
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.success,
        height: screenSize.fullHeight * 0.2,
      }}
      text1Style={text1Style}
      text2Style={text2Style}
      text1NumberOfLines={0}
      text2NumberOfLines={0}
    />
  ),
  error: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.warning,
        height: screenSize.fullHeight * 0.2,
      }}
      text1Style={text1Style}
      text2Style={text2Style}
      text1NumberOfLines={0}
      text2NumberOfLines={0}
    />
  ),
}

const App = () => {
  // TODO: temporary behavior
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 1000)
  })

  return (
    <SafeAreaView style={styles.container}>
      <ActionSheetProvider>
        <>
          <BottomTabNavigator />
          <Toast config={toastConfig} />
        </>
      </ActionSheetProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})

export default App
