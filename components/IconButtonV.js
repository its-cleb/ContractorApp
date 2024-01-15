import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

  // Component Usage
  // <IconButtonVLarge
  //   pressFunction={} 
  //   title='' 
  //   icon={''} 
  //   color='' 
  //   bgcolor=''
  //   size={}
  // />

const IconButtonVLarge = props => {    
  
  const navigation = useNavigation()

  let iconType 
  let hasBorder = props.border
  const getIcon = () => {

    switch(props.iconType) {
      case 'FontAwesome':
        iconType = <FontAwesome style={styles.buttonIcon} name={props.icon} size={props.size} color={props.color} />
        break
      default:
        iconType = <FontAwesome5 style={styles.buttonIcon} name={props.icon} size={props.size} color={props.color} />
    }
    return iconType
  }


  return (
    <TouchableOpacity 
      style={[styles.touchableOpacityButton, 
        {backgroundColor: `${props.bgcolor}`, borderColor: `${props.color}`, borderWidth: hasBorder ? 2 : 0}]} 
      onPress={props.pressFunction}
    > 
        {getIcon()}
        <Text style={[styles.title, {color: `${props.color}`}]}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    alignContent: 'center',
    fontWeight: 500
  },
  touchableOpacityButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "steelblue",
    borderRadius: 5,
    marginVertical: 5,
    padding: 10
  },
  buttonIcon: {
    margin: 10,
  },
})

export default IconButtonVLarge