import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalstyles'

const IconButtonHSmall = props => {    

  return (
    <TouchableOpacity onPress={props.pressFunction} style={[styles.touchableOpacity, { backgroundColor: `${props.bgcolor}`, flexDirection: 'row' }]}> 
      <FontAwesome5 style={styles.buttonIcon} name={props.icon} size={16} color={props.textcolor} />
      <Text style={{ color: `${props.textcolor}`, fontSize: 16}}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "steelblue",
    marginVertical: 5,
    borderRadius: 5,
    padding: 10,
  },
  buttonIcon: {
    padding: 5,
    marginRight: 5
  },
  textButton: {
    fontSize: 16,
    color: 'white'
  },
})

export default IconButtonHSmall