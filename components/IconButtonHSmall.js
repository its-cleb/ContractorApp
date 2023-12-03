import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalstyles'

const IconButtonHContent = props => {    

  return (
    <TouchableOpacity onPress={props.pressFunction} style={[styles.touchableOpacity, { backgroundColor: `${props.bgcolor}`, flexDirection: 'row' }]}> 
        <FontAwesome5 style={globalStyles.buttonIcon} name={props.icon} size={18} color={props.textcolor} />
        <Text style={[globalStyles.textButton, { color: `${props.textcolor}`, fontSize: 18}]}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "steelblue",
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
})

export default IconButtonHContent