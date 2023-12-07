import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalstyles'

const IconButtonHSmall = props => {    

  return (
    <TouchableOpacity onPress={props.pressFunction} style={[styles.touchableOpacity, { backgroundColor: `${props.bgcolor}`, flexDirection: 'row' }]}> 
        <FontAwesome5 style={globalStyles.buttonIcon} name={props.icon} size={16} color={props.textcolor} />
        <Text style={[globalStyles.textButton, { color: `${props.textcolor}`, fontSize: 16}]}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "steelblue",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    padding: 5,
  },
})

export default IconButtonHSmall