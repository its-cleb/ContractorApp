import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import { Context as EmployeeContext } from '../context/EmployeeContext'
import { IconButtonH } from '../components/Button'
import StackHeader from '../components/StackHeader'
import { Form, Row, Column, Caption, Field } from '../components/Form'
import useValidateForm from '../hooks/ValidateForm'
import ValidationBox from '../components/ValidationBox'

const EmployeeFormScreen = ({ route, navigation }) => {

  // Employee Data
  const { state, addEmployee, editEmployee  } = useContext(EmployeeContext)

  // Get props from parent component
  const isAdd = route.params.isAdd
  // const navigation = route.params.navigation
  const employeeID = route.params.payload

  // Declare default values if AddEmployee was the parent
  const blankForm = { 
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
  
  const employee = isAdd ? blankForm : state.find(employees => employees.employeeID === route.params.payload)
  
  const [ form, setForm ] = useState(employee)
  
  const setFormState = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }
  
  // --- Validation Box
  const [ validationBox, setValidationBox ] = useState(false)

  // Control Button functionality
  const addEmployeeBackPage = () => {
    addEmployee(form.employeeName, form.phone, form.email, form.address, form.unitNumber, form.city, form.usState, form.zip, form.wage)
    navigation.pop()
  }
  const saveEmployeeBackPage = () => {
    formIsValid = useValidateForm([form.employeeName])

    switch(formIsValid) {
      case true:
        setValidationBox(false)
        editEmployee(employeeID, form.employeeName, form.phone, form.email, form.address, form.unitNumber, form.city, form.usState, form.zip, form.wage)
        navigation.pop()
        break
      case false:
        setValidationBox(true)
        break
      default: 
        console.log('error')
    }
  }

  // Change buttons based on page
  let controlButtons =
  isAdd ?
    controlButtons = <IconButtonH pressFunction={addEmployeeBackPage} title='Add Employee' icon='plus' textcolor='white' bgcolor='steelblue' marginH={10} />
    :
    controlButtons = 
    <>
      <IconButtonH pressFunction={saveEmployeeBackPage} title='Save Changes' icon='save' textcolor='white' bgcolor='steelblue' marginH={10} />
      <IconButtonH pressFunction={() => navigation.pop()} title='Discard Changes' icon='undo' textcolor='white' bgcolor='maroon' marginH={10} />
    </>


  return (  
    <>
      <StackHeader title={isAdd ? 'Add Employee' : 'Edit Employee'} navFunction={() => navigation.pop()}/>

      <ValidationBox show={validationBox}>Employee Name must be added to be saved</ValidationBox>

      <Form>
        <Row>
          <Column flex={3}>
            <Caption>Employee Name</Caption>
            <Field value={form.employeeName} press={(text) => setFormState('employeeName', text)}/>
          </Column>

          <Column flex={1}>
            <Caption>Wage</Caption>
            <Field value={form.wage} numeric={true} press={(text) => setFormState('wage', text)}/>
          </Column>
        </Row>

        <Row>
          <Column flex={2}>
            <Caption>Phone</Caption>
            <Field value={form.phone} numeric={true} press={(text) => setFormState('phone', text)}/>
          </Column>

          <Column flex={3}>
            <Caption>Email</Caption>
            <Field value={form.email} press={(text) => setFormState('email', text)}/>
          </Column>
        </Row>

        <Row>
          <Column flex={2}>
            <Caption>Address</Caption>
            <Field value={form.address} press={(text) => setFormState('address', text)}/>
          </Column>

          <Column flex={1}>
            <Caption>Unit</Caption>
            <Field value={form.unitNumber} press={(text) => setFormState('unitNumber', text)}/>
          </Column>
        </Row>

        <Row>
          <Column flex={1}>
            <Caption>City</Caption>
            <Field value={form.city} press={(text) => setFormState('city', text)}/>
          </Column>

          <Column flex={1}>
            <Caption>State</Caption>
            <Field value={form.usState} press={(text) => setFormState('usState', text)}/>
          </Column>

          <Column flex={1}>
            <Caption>ZIP</Caption>
            <Field value={form.zip} press={(text) => setFormState('zip', text)}/>
          </Column>
        </Row>

        <View style={{ alignSelf: 'stretch', marginHorizontal: -10, paddingTop: 10}}>
          {controlButtons}
        </View>    
      
      </Form>
    </>
  ) 
}

export default EmployeeFormScreen