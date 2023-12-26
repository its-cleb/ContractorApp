import React from 'react'
import { useState, useContext } from 'react'
import { View, Text, TextInput, Pressable, Platform, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { globalStyles } from '../../styles/globalstyles'
import TextButton from '../TextButton'
import IconButtonHSmall from '../IconButtonHSmall'
import DatePicker from '../DatePicker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Context } from '../../context/ClientContext'

const ClientForm = ({ initialValues, nav, payload }) => {
  
  const { addClient, editClient } = useContext(Context)
  
  // Get props from parent component
  const navigation = nav
  const clientID = payload

  // Declare default values if AddClient was the parent
  const defaultClientValues = { 
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
 
  // Check if parent element passed initialValues prop
  if (initialValues === undefined) {
    clientValues = defaultClientValues
    clientEmpty = true
  } else {
    clientValues = Object.fromEntries(initialValues)
    clientEmpty = false
  }

  // Control Button functionality
  const addClientBackPage = () => {
    addClient(clientName, contactDate, phone, email, address, unitNumber, city, usState, zip )
    navigation.pop()
  }
  const saveClientBackPage = () => {
    editClient(clientID, clientName, contactDate, phone, email, address, unitNumber, city, usState, zip )
    navigation.pop()
  }

  // Change buttons based on page
  let controlButtons
  if (clientEmpty === true) {
    controlButtons = <IconButtonHSmall pressFunction={addClientBackPage} title='Add Client' icon='plus' textcolor='white' bgcolor='steelblue' />
  } else {
    controlButtons = 
    <>
      <IconButtonHSmall pressFunction={saveClientBackPage} title='Save Changes' icon='save' textcolor='white' bgcolor='steelblue' />
      <IconButtonHSmall pressFunction={() => navigation.pop()} title='Discard Changes' icon='undo' textcolor='white' bgcolor='maroon' />
    </>
  }
  
  // --- Form Inputs ---
  const [ clientName, setClientName ] = useState(clientValues.clientName)
  const [ contactDate, setContactDate ] = useState(clientValues.contactDate)
  const [ phone, setPhone ] = useState(clientValues.phone)
  const [ email, setEmail ] = useState(clientValues.email)
  const [ address, setAddress ] = useState(clientValues.address)
  const [ unitNumber, setUnitNumber ] = useState(clientValues.unitNumber)
  const [ city, setCity ] = useState(clientValues.city)
  const [ usState, setUsState ] = useState(clientValues.usState)
  const [ zip, setZip ] = useState(clientValues.zip)

  // Date Picker
  const [ showDatePicker, setShowDatePicker ] = useState(true)

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker)
  }

  function getDate(data) { // Receive Date from child component
    setFormState('date', data)
  }

  // // --- Date Picker ---
  // const [date, setDate] = useState(new Date())
  // const [showPicker, setShowPicker] = useState(false)

  // const toggleDatePicker = () => {
  //   setShowPicker(!showPicker)
  // }

  // const closeDatePickerAndKeyboard = () => {
  //   setShowPicker(false)
  //   Keyboard.dismiss()
  // }

  // const onChange = ({ type }, selectedDate) => {
  //   if (type == 'set') {
  //     const currentDate = selectedDate
  //     setDate(currentDate)

  //     if (Platform.OS === 'android') {
  //       toggleDatePicker()
  //       setContactDate(Intl.DateTimeFormat('en-US').format(currentDate))
  //     }
  //   } else {
  //     toggleDatePicker()
  //   }
  // }

  // const confirmIOSDate = () => {
  //   setContactDate(Intl.DateTimeFormat('en-US').format(date))
  //   toggleDatePicker()
  // }

  const dateKeyboardDismiss = () => {
    toggleDatePicker()
    Keyboard.dismiss()
  }

  return (
    <>    
    {/* --- Client Details --- */}
      <Pressable onPress={dateKeyboardDismiss} style={globalStyles.pressableBox}>

        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -500} style={styles.contentBox}>

          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 3 }]}>
              <Text style={globalStyles.formFieldCaption}>Client Name</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={clientName}
                onChangeText={text => setClientName(text)}></TextInput>
            </View>
            
            <View style={[globalStyles.formColumn, { flex: 2 }]}>
              <Pressable onPress={dateKeyboardDismiss}>
                <Text style={globalStyles.formFieldCaption}>Date of Contact</Text>
                <TextInput 
                  autoCorrect={false} 
                  style={globalStyles.formFieldInput} 
                  editable={false} 
                  value={contactDate}
                  onPressIn={dateKeyboardDismiss}
                  onChangeText={text => setDate(text)}
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
                value={phone}
                onChangeText={text => setPhone(text)}></TextInput>
            </View>

            <View style={[globalStyles.formColumn, { flex: 3 }]}>
              <Text style={globalStyles.formFieldCaption}>Email</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={email}
                onChangeText={text => setEmail(text)}></TextInput>
            </View>
          </View>

          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 2 }]}>
              <Text style={globalStyles.formFieldCaption}>Address</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={address}
                onChangeText={text => setAddress(text)}></TextInput>
            </View>

            <View style={[globalStyles.formColumn, { flex: 1 }]}>
              <Text style={globalStyles.formFieldCaption}>Unit</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={unitNumber}
                onChangeText={text => setUnitNumber(text)}></TextInput>
            </View>
          </View>

          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 1 }]}>
              <Text style={globalStyles.formFieldCaption}>City</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={city}
                onChangeText={text => setCity(text)}></TextInput>
            </View>

            <View style={[globalStyles.formColumn, { flex: 1 }]}>
              <Text style={globalStyles.formFieldCaption}>State</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput}
                value={usState}
                onChangeText={text => setUsState(text)}></TextInput>
            </View>

            <View style={[globalStyles.formColumn, { flex: 1 }]}>
              <Text style={globalStyles.formFieldCaption}>ZIP</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput} 
                keyboardType="numeric"
                value={zip}
                onChangeText={text => setZip(text)}></TextInput>
            </View>
          </View>

          <View style={{ alignSelf: 'stretch', marginHorizontal: -10}}>
            {controlButtons}
          </View>    
       
        </KeyboardAvoidingView>

        <DatePicker getDate={getDate} data={contactDate} show={showDatePicker} />
        {/* --- Date Picker --- */}
        {/* <View style={globalStyles.datePickerBoxIOS}>
        {showPicker && (
          <DateTimePicker 
            mode='date'
            display='spinner'
            value={date}
            onChange={onChange}
            style={globalStyles.datePicker}
            textColor='black'
          />
          )}

          {showPicker &&  Platform.OS === 'ios' && (
            <View style={[globalStyles.datePickerButtonsIOS, { flexDirection: 'row', gap: 10, marginHorizontal: 20}]}>
              <View style={[globalStyles.formColumn, { flex: 1 }]}>
                <TextButton  pressFunction={toggleDatePicker} bgcolor="maroon" text="Close Date Picker"/>
              </View>
              <View style={[globalStyles.formColumn, { flex: 1 }]}>
                <TextButton  style={[globalStyles.formColumn, { flex: 1 }]} pressFunction={confirmIOSDate} bgcolor="steelblue" text="Add Date"/>
              </View>
            </View>
          )}
        </View> */}
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