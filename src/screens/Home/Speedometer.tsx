import React, {useState, useEffect} from 'react'
import {Text, StyleSheet} from 'react-native'
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import {fonts, fontSize, screenSize, colors} from '../../styles'

const {fullWidth} = screenSize
const speedometerSide = fullWidth * 0.3

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
    let backgroundColor = colors.disabled
    if (speed >= 1 && speed <= 30) {
      backgroundColor = colors.success
    } else if (speed >= 31 && speed <= 50) {
      backgroundColor = colors.tomato
    } else if (speed >= 51) {
      backgroundColor = colors.warning
    }

    return {
      width: speedometerSide + animatedValue.value / 1.1,
      height: speedometerSide + animatedValue.value / 1.1,
      borderRadius: speedometerSide / 2 + animatedValue.value / 1.1,
      backgroundColor,
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
  speedometer: {
    width: speedometerSide,
    height: speedometerSide,
    backgroundColor: colors.disabled,
    borderRadius: speedometerSide / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: screenSize.fullHeight * 0.05,
  },
  speedometerText: {
    fontSize: fontSize.xxxl,
    fontFamily: fonts.extraBold,
  },
  speedometerUnits: {
    fontSize: fontSize.l,
    fontFamily: fonts.extraBold,
  },
})

export default Speedometer
