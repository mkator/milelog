import React, {type PropsWithChildren} from 'react'
import {View, Text, StyleSheet} from 'react-native'

const Home: React.FC<PropsWithChildren<{}>> = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Home
