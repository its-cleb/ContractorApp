import React, { useState, useContext } from 'react'
import { View, Pressable, Platform, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import { Context } from '../context/ClientContext'
import StackHeader from '../components/StackHeader'
import IconButtonHSmall from '../components/IconButtonHSmall'
import DatePicker from '../components/DatePicker'
import { Row, Column, Caption, Field } from '../components/Form'

const ClientFormScreen = ({ route, navigation }) => {

  const { state, addClient, editClient } = useContext(Context)

  const isAdd = route.params.isAdd

  // --- Form Data ---
  const blankForm = {
    clientID: '',
    clientName: '', 
    contactDate: '', 
    phone:'', 
    email:'', 
    address: '', 
    unitNumber:'', 
    city:'', 
    usState:'', 
    zip:'', 
  }

  const client = isAdd ? blankForm : state.find(clients => clients.clientID === route.params.payload)

  const [ form, setForm ] = useState(client)
  const setFormState = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Control Button functionality
  const saveClientBackPage = () => {
    isAdd ? 
      addClient(form.clientName, form.contactDate, form.phone, form.email, form.address, form.unitNumber, form.city, form.usState, form.zip ) 
      : 
      editClient(client.clientID, form.clientName, form.contactDate, form.phone, form.email, form.address, form.unitNumber, form.city, form.usState, form.zip )
    navigation.pop()
  }
  
  // Date Picker
  const [ showDatePicker, setShowDatePicker ] = useState(true)

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker)
  }
  function getDate(data) { // Receive Date from child component
    setFormState('contactDate', data)
  }

  const keyboardDismiss = () => {
    Keyboard.dismiss()
  }

  return (  
    <>
      <StackHeader title={isAdd ? 'Add Client' : 'Edit Client'} navFunction={() => navigation.pop()}/>

      <Pressable onPress={keyboardDismiss} style={globalStyles.pressableBox}>

        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -500} style={styles.contentBox}>

          <Row>
            <Column flex={3}>
              <Caption>Client Name</Caption>
              <Field value={form.clientName} press={(text) => setFormState('clientName', text)}/>
            </Column>
            
            <Column flex={2}>
              <Pressable onPress={toggleDatePicker}>
                <Caption>Date of Contact</Caption>
                <Field value={form.contactDate} pressIn={toggleDatePicker} press={(text) => setFormState('contactDate', text)}/>
              </Pressable>
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
              <Field value={form.zip} numeric={true} press={(text) => setFormState('zip', text)}/>
            </Column>
          </Row>

          <View style={{ alignSelf: 'stretch', marginHorizontal: -10}}>
            {isAdd ? 
              <IconButtonHSmall pressFunction={saveClientBackPage} title='Add Client' icon='plus' textcolor='white' bgcolor='steelblue' />
              : 
              <>
                <IconButtonHSmall pressFunction={saveClientBackPage} title='Save Changes' icon='save' textcolor='white' bgcolor='steelblue' />
                <IconButtonHSmall pressFunction={() => navigation.pop()} title='Discard Changes' icon='undo' textcolor='white' bgcolor='maroon' />
              </>
            }
          </View>    

        </KeyboardAvoidingView>

        <DatePicker getDate={getDate} data={form.contactDate} show={showDatePicker} />

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

export default ClientFormScreen