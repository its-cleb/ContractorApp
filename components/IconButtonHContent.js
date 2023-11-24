import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalstyles'

const IconButtonHContent = props => {    

  return (
    <TouchableOpacity onPress={props.pressFunction} style={[globalStyles.touchableOpacityButton, { backgroundColor: `${props.bgcolor}`, flexDirection: 'row', marginLeft: -15 }]}> 
        <FontAwesome5 style={globalStyles.buttonIcon} name={props.icon} size={24} color={props.textcolor} />
        <Text style={[globalStyles.textButton, { color: `${props.textcolor}`, fontSize: 24, fontWeight: 'bold'}]}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default IconButtonHContent