import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SimpleLineIcons, MaterialIcons, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalstyles'
import { useNavigation } from '@react-navigation/native'

const IconButtonBorderless = props => {    
  const navigation = useNavigation()

  return (
    <TouchableOpacity 
      style={[globalStyles.touchableOpacityButton, { backgroundColor: `${props.bgcolor}`, flexDirection: 'row', marginLeft: -15 }]}
      onPress={() => {navigation.navigate(`${props.navpage}`);}}
    > 
        <FontAwesome5 style={globalStyles.buttonIcon} name={props.icon} size={24} color={props.textcolor} />
        <Text style={[globalStyles.textButton, { color: `${props.textcolor}`, fontSize: 24, fontWeight: 'bold'}]}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default IconButtonBorderless