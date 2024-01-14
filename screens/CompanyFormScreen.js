import React, { useState, useContext } from 'react'
import { View, Pressable, Platform, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import IconButtonHSmall from '../components/IconButtonHSmall'
import StackHeader from '../components/StackHeader'
import { Context } from '../context/CompanyContext'
import { Row, Column, Caption, Field } from '../components/Form'

const CompanyFormScreen = ({ navigation }) => {

  const { state, editCompany } = useContext(Context)

  const [ form, setForm ] = useState(state)
  const setFormState = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Control Button functionality
  const saveCompanyBackPage = () => {
    editCompany(form.companyName, form.phone, form.email, form.address, form.unitNumber, form.city, form.usState, form.zip)
    navigation.pop()
  }

  const keyboardDismiss = () => {
    Keyboard.dismiss()
  }

  return (  
    <>
      <StackHeader title='Edit Company' navFunction={() => navigation.pop()}/>

      <Pressable onPress={keyboardDismiss} style={globalStyles.pressableBox}>

        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -500} style={styles.contentBox}>

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
            <IconButtonHSmall pressFunction={saveCompanyBackPage} title='Save Changes' icon='save' textcolor='white' bgcolor='steelblue' />
            <IconButtonHSmall pressFunction={() => navigation.pop()} title='Discard Changes' icon='undo' textcolor='white' bgcolor='maroon' />
          </View>    
       
        </KeyboardAvoidingView>

      </Pressable>
    </>     
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

export default CompanyFormScreen