import React from 'react'
import {SafeAreaView, StyleSheet} from 'react-native'
import BottomTabNavigator from './src/navigators/BottomTabNavigator'
import {ActionSheetProvider} from '@expo/react-native-action-sheet'
import {colors} from './src/styles'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActionSheetProvider>
        <BottomTabNavigator />
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
