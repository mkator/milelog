import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import * as Location from 'expo-location'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {colors, fonts, fontSize, screenSize} from '../../styles'
import {getAddressFromReversedGeocode} from '../../utils/helpers'
import {LocationHistoryStackProps} from '../../navigators/HistoryStackNavigator'

const {fullWidth, fullHeight} = screenSize

const LocationInfo = ({route}: LocationHistoryStackProps) => {
  const {startLocation, stopLocation} = route.params
  const [startAddress, setStartAddress] =
    useState<Location.LocationGeocodedAddress>()
  const [stopAddress, setStopAddress] =
    useState<Location.LocationGeocodedAddress>()

  useEffect(() => {
    if (Object.keys(startLocation).length !== 0) {
      const getStartAddress = async () => {
        const address = await reverseGeocodeAddress(
          startLocation.latitude,
          startLocation.longitude,
        )
        setStartAddress(address[0])
      }
      getStartAddress()
    }

    if (Object.keys(stopLocation).length !== 0) {
      const getStopAddress = async () => {
        const address = await reverseGeocodeAddress(
          stopLocation.latitude,
          stopLocation.longitude,
        )
        setStopAddress(address[0])
      }
      getStopAddress()
    }
  }, [startLocation, stopLocation])

  if (Object.keys(startLocation).length === 0) {
    return (
      <View style={styles.container}>
        <Text>Location is unavailable</Text>
      </View>
    )
  }

  const reverseGeocodeAddress = async (latitude: number, longitude: number) => {
    const address = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    })
    return address
  }

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Ionicons name="location-sharp" size={24} color="green" />
        <View style={styles.column} />
        <Ionicons name="location-sharp" size={24} color="red" />
      </View>
      <View style={styles.right}>
        <View>
          <Text style={styles.text}>
            Lat, Lon: {`${startLocation.latitude}, ${startLocation.longitude}`}
          </Text>
          <Text style={styles.text}>
            {getAddressFromReversedGeocode(startAddress)}
          </Text>
        </View>
        <View>
          <Text style={styles.text}>
            Lat, Lon: {`${stopLocation.latitude}, ${stopLocation.longitude}`}
          </Text>
          <Text style={styles.text}>
            {getAddressFromReversedGeocode(stopAddress)}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: fontSize.m,
    fontFamily: fonts.bold,
  },
  text: {
    fontSize: fontSize.xs,
    fontFamily: fonts.medium,
  },
  left: {
    width: fullWidth * 0.1,
    height: fullHeight * 0.3,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  right: {
    width: fullWidth * 0.8,
    height: fullHeight * 0.3,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  column: {
    width: 2,
    height: fullHeight * 0.125,
    backgroundColor: colors.slate,
  },
})

export default LocationInfo
