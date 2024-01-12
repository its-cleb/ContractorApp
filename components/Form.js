import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'

function Row(props) {    
  return (
    <View style={styles.row}>
      {props.children}
    </View>
  )
}

function Column(props) {    
  return (
    <View style={[styles.column, { flex: props.flex }]}>
      {props.children}
    </View>
  )
}
function Caption(props) {    
  return (
    <Text style={styles.caption}>
      {props.children}
    </Text>
  )
}

function Field(props) {
  let isNumeric = Boolean(props.numeric === undefined) ? false : true
  let hasPressIn = Boolean(props.pressIn === undefined) ? false : true

  return (
    hasPressIn ? 
    <TextInput 
      autoCorrect={false} 
      style={styles.field}
      value={props.value}
      onPressIn={props.pressIn}
      keyboardType={isNumeric ? "numeric" : "default"}
      onChangeText={props.press}>
    </TextInput>
    :
    <TextInput 
      autoCorrect={false} 
      style={styles.field}
      value={props.value}
      keyboardType={isNumeric ? "numeric" : "default"}
      onChangeText={props.press}>
    </TextInput>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 8
  },
  column: {
  },
  caption: {
    alignContent: 'flex-start',
    marginBottom: 1,
    fontWeight: 'bold'
  },
  field: {
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#999999',
    backgroundColor: '#eeeeee',
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    paddingHorizontal: 12,
    color: 'black'
  },
  formFieldInputMultiline: {
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#999999',
    backgroundColor: '#eeeeee',
    paddingTop: Platform.OS === 'ios' ? 10 : 16,
    paddingHorizontal: 12,
    minHeight: 80,
    textAlignVertical: 'top'
  },
})

export { Row, Column, Caption, Field } 