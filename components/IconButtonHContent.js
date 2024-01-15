import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

const IconButtonHContent = props => {    

  return (
    <TouchableOpacity onPress={props.pressFunction} style={[styles.touchableOpacityButton, { backgroundColor: `${props.bgcolor}`, flexDirection: 'row', marginLeft: -15 }]}> 
        <FontAwesome5 style={styles.buttonIcon} name={props.icon} size={24} color={props.textcolor} />
        <Text style={[styles.textButton, { color: `${props.textcolor}`, fontSize: 24, fontWeight: 'bold'}]}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchableOpacityButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "steelblue",
    borderRadius: 5,
    marginVertical: 5,
    padding: 10
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

export default IconButtonHContent