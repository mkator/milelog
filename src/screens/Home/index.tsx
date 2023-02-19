import React, {type PropsWithChildren} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {fonts} from '../../styles'

const Home: React.FC<PropsWithChildren<{}>> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.boldItalic,
  },
})

export default Home
