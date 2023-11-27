import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalstyles'
import { useNavigation } from '@react-navigation/native'

const IconButtonNavigate = props => {    
  
  const navigation = useNavigation()

  return (
    <TouchableOpacity 
      style={[globalStyles.touchableOpacityButton, { backgroundColor: `${props.bgcolor}` }]}
      onPress={() => {navigation.navigate(`${props.navpage}`);}}
    > 
        <FontAwesome5 style={globalStyles.buttonIcon} name={props.icon} size={34} color="white" />
        <Text style={globalStyles.textButton}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default IconButtonNavigate