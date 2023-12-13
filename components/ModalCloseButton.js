import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalstyles'

const ModalCloseButton = props => {

  return (
  <TouchableOpacity onPress={props.pressFunction} style={styles.button}> 
    <MaterialIcons style={globalStyles.modalCloseButton} name="close" size={30} color="black" />
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end'
  }
})
export default ModalCloseButton