import React from 'react'
import { useState, useContext } from 'react'
import { View, Text, TextInput, Keyboard, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { globalStyles } from '../../styles/globalstyles'
import IconButtonHSmall from '../IconButtonHSmall'
import { Context } from '../../context/EmployeeContext'
import { Row, Column, Caption, Field } from '../Form'

const EmployeeForm = ({ initialValues, navProp, payloadProp }) => {
  
  const { addEmployee, editEmployee } = useContext(Context)
  
  // Get props from parent component
  const navigation = navProp
  const employeeID = payloadProp

  // Declare default values if AddEmployee was the parent
  const defaultEmployeeValues = { 
    employeeID: '',
    employeeName: '', 
    phone:'', 
    email:'', 
    address: '', 
    unitNumber:'', 
    city:'', 
    usState:'', 
    zip:'', 
    wage: ''
  }
 
  // Check if parent element passed initialValues prop
  if (initialValues === undefined) {
    employeeValues = defaultEmployeeValues
    employeeEmpty = true
  } else {
    employeeValues = Object.fromEntries(initialValues)
    employeeEmpty = false
  }

  // Control Button functionality
  const addEmployeeBackPage = () => {
    addEmployee(employeeName, phone, email, address, unitNumber, city, usState, zip, wage)
    navigation.pop()
  }
  const saveEmployeeBackPage = () => {
    editEmployee(employeeID, employeeName, phone, email, address, unitNumber, city, usState, zip, wage)
    navigation.pop()
  }

  // Change buttons based on page
  let controlButtons
  if (employeeEmpty === true) {
    controlButtons = <IconButtonHSmall pressFunction={addEmployeeBackPage} title='Add Employee' icon='plus' textcolor='white' bgcolor='steelblue' />
  } else {
    controlButtons = 
    <>
      <IconButtonHSmall pressFunction={saveEmployeeBackPage} title='Save Changes' icon='save' textcolor='white' bgcolor='steelblue' />
      <IconButtonHSmall pressFunction={() => navigation.pop()} title='Discard Changes' icon='undo' textcolor='white' bgcolor='maroon' />
    </>
  }
  
  // --- Form Inputs ---
  const [ form, setForm ] = useState(company)
  const setFormState = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }
  const [ employeeName, setEmployeeName ] = useState(employeeValues.employeeName)
  const [ phone, setPhone ] = useState(employeeValues.phone)
  const [ email, setEmail ] = useState(employeeValues.email)
  const [ address, setAddress ] = useState(employeeValues.address)
  const [ unitNumber, setUnitNumber ] = useState(employeeValues.unitNumber)
  const [ city, setCity ] = useState(employeeValues.city)
  const [ usState, setUsState ] = useState(employeeValues.usState)
  const [ zip, setZip ] = useState(employeeValues.zip)
  const [ wage, setWage ] = useState(employeeValues.wage)

  const keyboardDismiss = () => {
    Keyboard.dismiss()
  }
  
  return (

    <TouchableWithoutFeedback onPress={keyboardDismiss} style={globalStyles.pressableBox}>

        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -500} style={styles.contentBox}>

          <Row>
            <Column flex={3}>
              <Caption>Employee Name</Caption>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={employeeName}
                onChangeText={text => setEmployeeName(text)}></TextInput>
            </Column>
            <Column flex={1}>
              <Caption>Wage</Caption>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                keyboardType="numeric"
                value={wage}
                onChangeText={text => setWage(text)}></TextInput>
            </Column>
          </Row>

          <Row>
            <Column flex={2}>
              <Caption>Phone</Caption>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput} 
                keyboardType="numeric"
                value={phone}
                onChangeText={text => setPhone(text)}></TextInput>
            </Column>

            <Column flex={3}>
              <Caption>Email</Caption>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={email}
                onChangeText={text => setEmail(text)}></TextInput>
            </Column>
          </Row>

          <Row>
            <Column flex={2}>
              <Caption>Address</Caption>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={address}
                onChangeText={text => setAddress(text)}></TextInput>
            </Column>

            <Column flex={1}>
              <Caption>Unit</Caption>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={unitNumber}
                onChangeText={text => setUnitNumber(text)}></TextInput>
            </Column>
          </Row>

          <Row>
            <Column flex={1}>
              <Caption>City</Caption>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={city}
                onChangeText={text => setCity(text)}></TextInput>
            </Column>

            <Column flex={1}>
              <Caption>State</Caption>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={usState}
                onChangeText={text => setUsState(text)}></TextInput>
            </Column>

            <Column flex={1}>
              <Caption>ZIP</Caption>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput} 
                keyboardType="numeric"
                value={zip}
                onChangeText={text => setZip(text)}></TextInput>
            </Column>
          </Row>

          <View style={{ alignSelf: 'stretch', marginHorizontal: -10, paddingTop: 10}}>
            {controlButtons}
          </View>    
       
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
  ) 
}

const styles = StyleSheet.create({
    contentBox: {
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 20,
      flex: 1,
    },

})
export default EmployeeForm