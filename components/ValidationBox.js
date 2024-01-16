import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const ValidationBox = (props) => {    
  
  return (
    <View style={[styles.validationBox, {display: props.show ? 'flex' : 'none' }]}>
      <Text style={styles.validationText}>{props.children}</Text>
    </View>
  )
}

const styles=StyleSheet.create({
  validationBox: {
    padding: 5,
    backgroundColor: 'rgba(255,34,34,0.2)'
  },
  validationText: {
    textAlign: 'center',
    color: 'maroon'
  },
})

export default ValidationBox