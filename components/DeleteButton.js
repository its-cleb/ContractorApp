import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const DeleteButton = props => {

  return (
  <TouchableOpacity onPress={props.pressFunction} style={styles.button}> 
    <MaterialIcons style={styles.icon} name="delete-forever" size={30} color="white" />
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    backgroundColor: 'darkred',
    borderRadius: 5,
    marginTop: -2,
    marginBottom: 2
  },
  icon: {
    padding: 3
  }
})

export default DeleteButton