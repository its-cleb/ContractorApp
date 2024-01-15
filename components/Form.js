import React from 'react'
import { StyleSheet, Pressable, Keyboard, Platform, KeyboardAvoidingView, View, Text, TextInput } from 'react-native'

function Form(props) {
  let hasStyles = Boolean(props.addStyles === undefined) ? false : true

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={{flex: 1}}>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -500} style={[styles.form, hasStyles ? props.addStyles : '']}>
        {props.children}
      </KeyboardAvoidingView>
    </Pressable>
    
  )
}

function Row(props) {
  let hasMargin = Boolean(props.marginB === undefined) ? false : true
  let hasStyles = Boolean(props.addStyles === undefined) ? false : true

  return (
    <View style={[styles.row, hasStyles ? props.addStyles : '', hasMargin ? { marginBottom:  props.marginB } : '']}>
      {props.children}
    </View>
  )
}

function Column(props) {    
  let hasStyles = Boolean(props.addStyles === undefined) ? false : true

  return (
    <View style={[styles.column, hasStyles ? props.addStyles : '', { flex: props.flex }]}>
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
      inputMode='none'
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
  form: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    flex: 1,
    zIndex: 1
  },
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

export { Form, Row, Column, Caption, Field } 