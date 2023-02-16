import React from 'react'
import {SafeAreaView, StyleSheet} from 'react-native'
import Home from './src/screens/Home'
import {colors} from './src/styles'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
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
