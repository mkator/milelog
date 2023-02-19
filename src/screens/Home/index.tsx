import React, {type PropsWithChildren, useState, useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Location from 'expo-location'
import {fonts} from '../../styles'

const Home: React.FC<PropsWithChildren<{}>> = () => {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    ;(async () => {
      let {status} = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
    })()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Icon name="home" size={30} color="#900" />
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
