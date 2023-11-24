import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalstyles'

const ModalCloseButton = props => {

  return (
  <TouchableOpacity onPress={props.pressFunction}> 
    <MaterialIcons style={globalStyles.modalCloseButton} name="close" size={30} color="black" />
  </TouchableOpacity>
  )
}

export default ModalCloseButton