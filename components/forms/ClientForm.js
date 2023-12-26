import React from 'react'
import { useState, useContext } from 'react'
import { View, Text, TextInput, Pressable, Platform, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { globalStyles } from '../../styles/globalstyles'
import IconButtonHSmall from '../IconButtonHSmall'
import DatePicker from '../DatePicker'
import { Context } from '../../context/ClientContext'

const ClientForm = ({ initialValues, nav, payload, isAdd }) => {
  
  const { addClient, editClient } = useContext(Context)
  
  // Get props from parent component
  const navigation = nav
  const clientID = payload

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

  const formData = isAdd ? blankForm : Object.fromEntries(initialValues)

  const [ form, setForm ] = useState(formData)
  const setFormState = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Control Button functionality
  const saveClientBackPage = () => {
    isAdd ? 
    addClient(form.clientName, form.contactDate, form.phone, form.email, form.address, form.unitNumber, form.city, form.usState, form.zip ) : 
    editClient(clientID, form.clientName, form.contactDate, form.phone, form.email, form.address, form.unitNumber, form.city, form.usState, form.zip )
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
    {/* --- Client Details --- */}
      <Pressable onPress={keyboardDismiss} style={globalStyles.pressableBox}>

        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -500} style={styles.contentBox}>

          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 3 }]}>
              <Text style={globalStyles.formFieldCaption}>Client Name</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={form.clientName}
                onChangeText={(text) => setFormState('clientName', text)}></TextInput>
            </View>
            
            <View style={[globalStyles.formColumn, { flex: 2 }]}>
              <Pressable onPress={toggleDatePicker}>
                <Text style={globalStyles.formFieldCaption}>Date of Contact</Text>
                <TextInput 
                  autoCorrect={false} 
                  style={globalStyles.formFieldInput} 
                  editable={false} 
                  value={form.contactDate}
                  onPressIn={toggleDatePicker}
                  onChangeText={(text) => setFormState('contactDate', text)}
                ></TextInput>
              </Pressable>
            </View>
          </View>

          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 2 }]}>
              <Text style={globalStyles.formFieldCaption}>Phone</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput} 
                keyboardType="numeric"
                value={form.phone}
                onChangeText={(text) => setFormState('phone', text)}></TextInput>
            </View>

            <View style={[globalStyles.formColumn, { flex: 3 }]}>
              <Text style={globalStyles.formFieldCaption}>Email</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={form.email}
                onChangeText={(text) => setFormState('email', text)}></TextInput>
            </View>
          </View>

          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 2 }]}>
              <Text style={globalStyles.formFieldCaption}>Address</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={form.address}
                onChangeText={(text) => setFormState('address', text)}></TextInput>
            </View>

            <View style={[globalStyles.formColumn, { flex: 1 }]}>
              <Text style={globalStyles.formFieldCaption}>Unit</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={form.unitNumber}
                onChangeText={(text) => setFormState('unitNumber', text)}></TextInput>
            </View>
          </View>

          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 1 }]}>
              <Text style={globalStyles.formFieldCaption}>City</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={form.city}
                onChangeText={(text) => setFormState('city', text)}></TextInput>
            </View>

            <View style={[globalStyles.formColumn, { flex: 1 }]}>
              <Text style={globalStyles.formFieldCaption}>State</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={form.usState}
                onChangeText={(text) => setFormState('usState', text)}></TextInput>
            </View>

            <View style={[globalStyles.formColumn, { flex: 1 }]}>
              <Text style={globalStyles.formFieldCaption}>ZIP</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput} 
                keyboardType="numeric"
                value={form.zip}
                onChangeText={(text) => setFormState('zip', text)}></TextInput>
            </View>
          </View>

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
export default ClientForm