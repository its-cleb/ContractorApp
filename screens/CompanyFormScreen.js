import React, { useState, useContext } from 'react'
import { View } from 'react-native'
import StackHeader from '../components/StackHeader'
import { Context } from '../context/CompanyContext'
import { Form, Row, Column, Caption, Field } from '../components/Form'
import { IconButtonH } from '../components/Button'
import useValidateForm from '../hooks/ValidateForm'
import ValidationBox from '../components/ValidationBox'

const CompanyFormScreen = ({ navigation }) => {

  const { state, editCompany } = useContext(Context)

  const [ form, setForm ] = useState(state)
  const setFormState = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // --- Validation Box
  const [ validationBox, setValidationBox ] = useState(false)

  // Control Button functionality
  const saveCompanyBackPage = () => {
    formIsValid = useValidateForm([form.companyName])

    switch(formIsValid) {
      case true:
        setValidationBox(false)
        editCompany(form.companyName, form.phone, form.email, form.address, form.unitNumber, form.city, form.usState, form.zip)
        navigation.pop()
        break
      case false:
        setValidationBox(true)
        break
      default: 
        console.log('error')
    }
  }

  return (  
    <>
      <StackHeader title='Edit Company' navFunction={() => navigation.pop()}/>

      <ValidationBox show={validationBox}>Company Name must be added to be saved</ValidationBox>

      <Form>
        <Row>
          <Column flex={3}>
            <Caption>Company Name</Caption>
            <Field value={form.companyName} press={(text) => setFormState('companyName', text)}/>
          </Column>
        </Row>

        <Row>
          <Column flex={2}>
            <Caption>Phone</Caption>
            <Field value={form.phone} press={(text) => setFormState('phone', text)}/>
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
            <Field value={form.zip} numeric={true} press={(text) => setFormState('zip', text)}/>
          </Column>
        </Row>

        <View style={{ alignSelf: 'stretch', marginHorizontal: -10}}>
          <IconButtonH pressFunction={saveCompanyBackPage} title='Save Changes' icon='save' textcolor='white' bgcolor='steelblue' marginH={10} />
          <IconButtonH pressFunction={() => navigation.pop()} title='Discard Changes' icon='undo' textcolor='white' bgcolor='maroon' marginH={10} />
        </View>    

      </Form>
    </>     
  ) 
}

export default CompanyFormScreen