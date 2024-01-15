import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const IconButtonNavigate = props => {    
  
  const navigation = useNavigation()

  return (
    <TouchableOpacity 
      style={[styles.touchableOpacity, { backgroundColor: `${props.bgcolor}` }]}
      onPress={() => {navigation.navigate(`${props.navpage}`);}}
    > 
        <FontAwesome5 style={styles.buttonIcon} name={props.icon} size={34} color="white" />
        <Text style={styles.textButton}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "steelblue",
    marginVertical: 5,
    borderRadius: 5,
    padding: 10,
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

export default IconButtonNavigate