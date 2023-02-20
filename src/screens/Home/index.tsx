import React, {type PropsWithChildren, useState, useEffect, useRef} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import getDistance from 'geolib/es/getDistance'
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import {fonts, colors} from '../../styles'
import Button from '../../components/Button'

const meterToMile = (meter: number) => (meter ? meter / 1609.344 : 0)

const TASK_NAME = 'BACKGROUND_LOCATION_TASK'

const Home: React.FC<PropsWithChildren<{}>> = () => {
  const [, setErrorMsg] = useState(null)
  const [, setUpdate] = useState(null)
  const location = useRef(null)
  const distance = useRef(0)

  TaskManager.defineTask(TASK_NAME, ({data: {locations}, error}) => {
    if (error) {
      // check `error.message` for more details.
      return
    }

    if (location.current && locations) {
      const newDistance = getDistance(
        {
          lat: location.current?.coords.latitude,
          lon: location.current?.coords.longitude,
        },
        {
          lat: locations[0].coords.latitude,
          lon: locations[0].coords.longitude,
        },
      )
      distance.current = distance.current + meterToMile(newDistance)
    }
    location.current = locations[0]
    // 2 cents to rerender screen
    setUpdate(locations[0])
  })

  useEffect(() => {
    ;(async () => {
      const hasPermission = await requestPermission()
      if (!hasPermission) return
      let currentLocation = await Location.getCurrentPositionAsync({})
      location.current = currentLocation
    })()

    return () => {
      Location.stopLocationUpdatesAsync(TASK_NAME)
    }
  }, [])

  const requestPermission = async () => {
    const foregound = await Location.requestForegroundPermissionsAsync()
    if (foregound.status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      console.log('requestPermission => ', foregound.status)
      return false
    }
    const background = await Location.requestBackgroundPermissionsAsync()
    if (background.status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return false
    }
    return true
  }

  const startBackgroundTracking = async () => {
    location.current = null
    const background = await Location.requestBackgroundPermissionsAsync()
    if (background.status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(TASK_NAME)
    if (hasStarted) {
      return
    }

    await Location.startLocationUpdatesAsync(TASK_NAME, {
      showsBackgroundLocationIndicator: true,
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 5000,
      distanceInterval: 5,
      foregroundService: {
        notificationTitle: 'Location',
        notificationBody: 'Location tracking in background',
        notificationColor: '#fff',
      },
    })
  }

  // Stop location tracking in background
  const stopBackgroundTracking = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(TASK_NAME)
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(TASK_NAME)
    }

    reset()
  }

  const reset = async () => {
    distance.current = 0
    setUpdate({})
  }

  return (
    <View style={styles.container}>
      <View style={styles.rawDataContainer}>
        <View style={styles.rawDataLeft}>
          <Text style={styles.text}>Speed</Text>
          <Text style={styles.text}>Heading</Text>
          <Text style={styles.text}>Longtitude</Text>
          <Text style={styles.text}>Latitude</Text>
          <Text style={styles.text}>Altitude Accuracy</Text>
          <Text style={styles.text}>Accuracy</Text>
          <Text style={styles.text}>Distance</Text>
        </View>
        <View style={styles.rawDataRight}>
          <Text style={styles.text}>{`${
            location?.current?.coords?.speed || 0
          } mph`}</Text>
          <Text style={styles.text}>{`${
            location?.current?.coords?.heading || 0
          } degree`}</Text>
          <Text style={styles.text}>{`${
            location?.current?.coords?.longitude || 0
          } degree`}</Text>
          <Text style={styles.text}>{`${
            location?.current?.coords?.latitude || 0
          } degree`}</Text>
          <Text style={styles.text}>{`${
            location?.current?.coords?.altitudeAccuracy || 0
          } meter`}</Text>
          <Text style={styles.text}>{`${
            location?.current?.coords?.accuracy || 0
          } meter`}</Text>
          <Text style={styles.text}>
            {(distance?.current).toFixed(5)} miles
          </Text>
        </View>
      </View>
      <View style={styles.btnGroup}>
        <Button
          title="Start"
          onPress={startBackgroundTracking}
          style={styles.startBtn}
        />
        <Button
          title="Stop"
          onPress={stopBackgroundTracking}
          style={styles.stopBtn}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontFamily: fonts.mediumItalic,
  },
  rawDataContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rawDataLeft: {
    width: '45%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rawDataRight: {
    width: '45%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  btnGroup: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 20,
  },
  startBtn: {
    backgroundColor: 'lightgreen',
  },
  stopBtn: {
    backgroundColor: colors.warning,
  },
})

export default Home
