import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { globalStyles } from '../styles/globalstyles'

const TextButton = props => {    

  return (
    <TouchableOpacity 
      style={[globalStyles.TextButton, { backgroundColor: `${props.bgcolor}`}]}
      onPress={props.pressFunction}
    > 
      <Text style={globalStyles.textButton}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default TextButton