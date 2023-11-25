import React from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Modal, TextInput, Pressable, Platform, Keyboard, KeyboardAvoidingView } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import { useNavigation } from '@react-navigation/native'
import IconButtonHContent from '../components/IconButtonHContent'
import TextButton from '../components/TextButton'
import ModalCloseButton from '../components/ModalCloseButton'
import DateTimePicker from '@react-native-community/datetimepicker'



const ProjectsScreen = () => {

// Project Details
const [contactDate, setContactDate] = useState("")

// Date Picker
const [date, setDate] = useState(new Date())
const [showPicker, setShowPicker] = useState(false)

const toggleDatePicker = () => {
  setShowPicker(!showPicker)
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
// Modal Control
const [modalVisible, setModalVisible] = useState(false);

const openModal = () => {
  setModalVisible(true)
  setShowPicker(false)
}
const closeModal = () => {
  setModalVisible(false)
}

  return (
    <>
    <View style={globalStyles.containerHCentered}>
      <Text style={globalStyles.textTitle}>Projects</Text>
    </View>

    <IconButtonHContent pressFunction={openModal} title="Add Project" icon="plus" bgcolor="#00000000" textcolor="steelblue"/> 
    
    {/* --- Project Details modal --- */}
    <Modal
      animationType="slide"
      visible={modalVisible}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <Pressable onPress={Keyboard.dismiss} style={globalStyles.pressableBox}>
        <ModalCloseButton pressFunction={closeModal} />

        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} style={globalStyles.modal}>
          
          <Text style={[globalStyles.textTitle, { marginBottom: 20 }]}> Add New Project </Text>

          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 3 }]}>
              <Text style={globalStyles.formFieldCaption}>Client Name</Text>
              <TextInput autoCorrect={false} style={globalStyles.formFieldInput} placeholder="John Smith"></TextInput>
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
                ></TextInput>
              </Pressable>
            </View>
          </View>

          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 2 }]}>
              <Text style={globalStyles.formFieldCaption}>Phone</Text>
              <TextInput autoCorrect={false} style={globalStyles.formFieldInput} placeholder="Project 1" keyboardType="numeric"></TextInput>
            </View>

            <View style={[globalStyles.formColumn, { flex: 3 }]}>
              <Text style={globalStyles.formFieldCaption}>Email</Text>
              <TextInput autoCorrect={false} style={globalStyles.formFieldInput} placeholder="John Smith"></TextInput>
            </View>
          </View>

          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 2 }]}>
              <Text style={globalStyles.formFieldCaption}>Address</Text>
              <TextInput autoCorrect={false} style={globalStyles.formFieldInput} placeholder="Street Address"></TextInput>
            </View>

            <View style={[globalStyles.formColumn, { flex: 1 }]}>
              <Text style={globalStyles.formFieldCaption}>Unit</Text>
              <TextInput autoCorrect={false} style={globalStyles.formFieldInput}></TextInput>
            </View>
          </View>

          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 1 }]}>
              <Text style={globalStyles.formFieldCaption}>City</Text>
              <TextInput autoCorrect={false} style={globalStyles.formFieldInput}></TextInput>
            </View>

            <View style={[globalStyles.formColumn, { flex: 1 }]}>
              <Text style={globalStyles.formFieldCaption}>State</Text>
              <TextInput autoCorrect={false} style={globalStyles.formFieldInput}></TextInput>
            </View>

            <View style={[globalStyles.formColumn, { flex: 1 }]}>
              <Text style={globalStyles.formFieldCaption}>ZIP</Text>
              <TextInput autoCorrect={false} style={globalStyles.formFieldInput} keyboardType="numeric"></TextInput>
            </View>
          </View>
          
          <View style={globalStyles.formRow}>
            <View style={[globalStyles.formColumn, { flex: 1 }]}>
              <Text style={globalStyles.formFieldCaption}>Project Description</Text>
              <TextInput autoCorrect={false} style={globalStyles.formFieldInputMultiline} multiline></TextInput>
            </View>
          </View>

          <TextButton pressFunction={closeModal} bgcolor="steelblue" text="Add Project"/>
          
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
                <TextButton   pressFunction={toggleDatePicker} bgcolor="maroon" text="Close Date Picker"/>
              </View>
              <View style={[globalStyles.formColumn, { flex: 1 }]}>
                <TextButton  style={[globalStyles.formColumn, { flex: 1 }]} pressFunction={confirmIOSDate} bgcolor="steelblue" text="Add Date"/>
              </View>
            </View>
          )}
        </View>
      </Pressable>
    </Modal>
    </>
  ) 
}

const styles = StyleSheet.create({})

export default ProjectsScreen