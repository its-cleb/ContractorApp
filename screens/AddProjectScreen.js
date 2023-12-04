import React from 'react'
import { useState, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, Platform, Keyboard, KeyboardAvoidingView } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import TextButton from '../components/TextButton'
import DateTimePicker from '@react-native-community/datetimepicker'
import IconButtonHSmall from '../components/IconButtonHSmall'
import { Context } from '../context/ProjectContext'

const AddProjectsScreen = ({ navigation }) => {
  
  const { addProject } = useContext(Context)

  // --- Form Inputs ---
  const [ clientName, setClientName ] = useState('')
  const [ contactDate, setContactDate ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ address, setAddress ] = useState('')
  const [ unitNumber, setUnitNumber ] = useState('')
  const [ city, setCity ] = useState('')
  const [ usState, setUsState ] = useState('')
  const [ zip, setZip ] = useState('')
  const [ description, setDescription ] = useState('')


  
  const addProjectBackPage = () => {
    addProject(clientName, contactDate, phone, email, address, unitNumber, city, usState, zip, description)
    navigation.pop()
  }

  // --- Date Picker ---

  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  const closeDatePickerAndKeyboard = () => {
    setShowPicker(false)
    Keyboard.dismiss()
  }

  const onChange = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate
      setDate(currentDate)

      if (Platform.OS === 'android') {
        toggleDatePicker()
        setContactDate(Intl.DateTimeFormat('en-US').format(currentDate))
      }
    } else {
      toggleDatePicker()
    }
  }

  const confirmIOSDate = () => {
    setContactDate(Intl.DateTimeFormat('en-US').format(date))
    toggleDatePicker()
  }

  const dateKeyboardDismiss = () => {
    toggleDatePicker()
    Keyboard.dismiss()
  }

  return (
    <>    
    {/* --- Project Details --- */}
      <Pressable onPress={closeDatePickerAndKeyboard} style={globalStyles.pressableBox}>

        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -20} style={globalStyles.modal}>
          
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
          
          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 1 }]}>
              <Text style={globalStyles.formFieldCaption}>Project Description</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInputMultiline} 
                multiline
                value={description}
                onChangeText={text => setDescription(text)}></TextInput>
            </View>
          </View>

          <View style={{ alignSelf: 'stretch', marginHorizontal: -10}}>
            <IconButtonHSmall pressFunction={addProjectBackPage} title='Add Project' icon='plus' textcolor='white' bgcolor='steelblue' />
          </View>
        </KeyboardAvoidingView>

        {/* --- Date Picker --- */}
        <View style={globalStyles.datePickerBoxIOS}>
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
        </View>
      </Pressable>
    </>
  ) 
  }

const styles = StyleSheet.create({

})

export default AddProjectsScreen