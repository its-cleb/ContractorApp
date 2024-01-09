import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalstyles'
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
        iconType = <FontAwesome style={globalStyles.buttonIcon} name={props.icon} size={props.size} color={props.color} />
        break
      default:
        iconType = <FontAwesome5 style={globalStyles.buttonIcon} name={props.icon} size={props.size} color={props.color} />
    }
    return iconType
  }


  return (
    <TouchableOpacity 
      style={[globalStyles.touchableOpacityButton, 
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
  }
})

export default IconButtonVLarge