import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SimpleLineIcons, MaterialIcons, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalstyles'

const IconButtonNavigate = () => {
  return (
    <TouchableOpacity 
      style={globalStyles.touchableOpacityButton}
      onPress={() => {props.navigation.navigate('Estimator');}}
    >
        <FontAwesome style={globalStyles.buttonIcon} name="calculator" size={40} color="white" />
        <Text style={globalStyles.textButton}>Estimates</Text>
    </TouchableOpacity>
  )
}

export default IconButtonNavigate