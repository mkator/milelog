import React, {useState, useEffect} from 'react'
import {Text, StyleSheet} from 'react-native'
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import {fonts, fontSize, screenSize} from '../../styles'

const Speedometer = ({speed = 0}: any) => {
  const [, setUpdate] = useState(0)
  const animatedValue = useSharedValue(speed)

  useEffect(() => {
    animatedValue.value = withTiming(speed, {
      duration: 500,
      easing: Easing.linear,
    })
    setUpdate(speed)
  }, [speed])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: 160 + animatedValue.value / 2,
      height: 160 + animatedValue.value / 2,
      borderRadius: 80 + animatedValue.value / 2,
      backgroundColor:
        speed && speed >= 1 && speed <= 4
          ? 'lightgreen'
          : speed && speed >= 5
          ? 'tomato'
          : '#DDD',
    }
  })

  return (
    <Animated.View style={[styles.speedometer, animatedStyles]}>
      <Text style={styles.speedometerText}>{speed}</Text>
      <Text style={styles.speedometerUnits}>mph</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  speedometer: {
    width: 160,
    height: 160,
    backgroundColor: '#DDD',
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: screenSize.fullHeight * 0.05,
  },
  speedometerText: {
    fontSize: fontSize.xxxl,
    fontFamily: fonts.extraBold,
    color: '#444',
  },
  speedometerUnits: {
    fontSize: fontSize.l,
    fontFamily: fonts.extraBold,
    color: '#444',
  },
})

export default Speedometer
