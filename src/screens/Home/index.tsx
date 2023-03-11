import React, {type PropsWithChildren, useState, useEffect, useRef} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import getDistance from 'geolib/es/getDistance'
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import * as Linking from 'expo-linking'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import Toast from 'react-native-toast-message'
import Button from '../../components/Button'
import {fonts, colors, screenSize} from '../../styles'
import {TASK_NAME, STORAGE_KEY} from '../../utils/constants'
import {meterToMile, formatNumberDigits} from '../../utils/helpers'
import Speedometer from './Speedometer'

const {fullHeight, fullWidth} = screenSize

const Home: React.FC<PropsWithChildren<{}>> = () => {
  const [, setUpdate] = useState(null)
  const [start, setStart] = useState(moment().valueOf())
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
          lat: location.current?.coords?.latitude,
          lon: location.current?.coords?.longitude,
        },
        {
          lat: locations[0].coords?.latitude,
          lon: locations[0].coords?.longitude,
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
      showPermissionErrorMessage()
      return false
    }
    const background = await Location.requestBackgroundPermissionsAsync()
    if (background.status !== 'granted') {
      showPermissionErrorMessage()
      return false
    }
    return true
  }

  const startBackgroundTracking = async () => {
    setStart(new Date().getTime())
    location.current = null
    const background = await Location.requestBackgroundPermissionsAsync()
    if (background.status !== 'granted') {
      showPermissionErrorMessage()
      return
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(TASK_NAME)
    if (hasStarted) return

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
    storeData(distance.current)
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

  const storeData = async (value: any) => {
    try {
      const storedData = await getData()
      let temp
      if (storedData) {
        temp = [
          ...storedData,
          {
            date: moment(start).format('MM-DD-YYYY'),
            start,
            stop: moment().valueOf(),
            mile: value,
          },
        ]
      } else {
        temp = [
          {
            date: moment(start).format('MM-DD-YYYY'),
            start,
            stop: moment().valueOf(),
            mile: value,
          },
        ]
      }

      const jsonValue = JSON.stringify(temp)
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
    } catch (e) {
      // handle error
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
      if (jsonValue !== null) {
        // value previously stored
        const value = JSON.parse(jsonValue)
        return value
      }
    } catch (e) {
      // error reading value
    }

    return null
  }

  const showPermissionErrorMessage = () => {
    Toast.show({
      type: 'error',
      text1: 'Permission to access location was denied',
      text2: 'Tap here to open Settings - Choose Always',
      topOffset: fullHeight * 0.03,
      visibilityTime: 5000,
      onPress: () => Linking.openSettings(),
    })
  }

  return (
    <View style={styles.container}>
      <Speedometer
        speed={formatNumberDigits(location.current?.coords?.speed, 0)}
      />
      <View style={styles.rawDataContainer}>
        <View style={styles.rawDataLeft}>
          <Text style={styles.text}>Heading</Text>
          <Text style={styles.text}>Longtitude</Text>
          <Text style={styles.text}>Latitude</Text>
          <Text style={styles.text}>Altitude Accuracy</Text>
          <Text style={styles.text}>Accuracy</Text>
          <Text style={styles.text}>Distance</Text>
        </View>
        <View style={styles.rawDataRight}>
          <Text style={styles.text}>{`${
            location.current?.coords?.heading || 0
          } degree`}</Text>
          <Text style={styles.text}>{`${
            location.current?.coords?.longitude || 0
          } degree`}</Text>
          <Text style={styles.text}>{`${
            location.current?.coords?.latitude || 0
          } degree`}</Text>
          <Text style={styles.text}>{`${formatNumberDigits(
            location.current?.coords?.altitudeAccuracy,
          )} meter`}</Text>
          <Text style={styles.text}>{`${formatNumberDigits(
            location.current?.coords?.accuracy,
          )} meter`}</Text>
          <Text style={styles.text}>
            {formatNumberDigits(distance?.current)} miles
          </Text>
        </View>
      </View>
      <View style={styles.btnGroup}>
        <Button
          title="Start"
          onPress={startBackgroundTracking}
          style={styles.startBtn}
          disabled={distance.current !== 0}
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
    marginVertical: fullHeight * 0.05,
  },
  startBtn: {
    backgroundColor: 'lightgreen',
    width: fullWidth * 0.2,
  },
  stopBtn: {
    backgroundColor: colors.warning,
    width: fullWidth * 0.2,
  },
})

export default Home
