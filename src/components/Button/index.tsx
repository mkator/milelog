import React from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'
import {fonts, colors} from '../../styles'

const Button = (props: any) => {
  const {onPress, title, style, textStyle, disabled} = props
  console.log('title => ', title)
  console.log('disabled => ', disabled)

  const backgroundStyle = disabled
    ? {backgroundColor: 'lightgrey'}
    : {backgroundColor: style.backgroundColor || colors.primary}

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, {...style}, backgroundStyle]}>
      <Text style={[styles.text, {...textStyle}]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  text: {
    fontFamily: fonts.medium,
  },
})

export default Button
