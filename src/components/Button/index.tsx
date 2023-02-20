import React from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'
import {fonts} from '../../styles'

const Button = (props: any) => {
  const {onPress, title, style, textStyle} = props
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, {...style}]}>
      <Text style={[styles.text, {...textStyle}]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  text: {
    fontFamily: fonts.medium,
  },
})

export default Button
