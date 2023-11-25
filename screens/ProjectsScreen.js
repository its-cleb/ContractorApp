import React from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Pressable, Platform } from 'react-native'
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

// Modal Control
const [modalVisible, setModalVisible] = useState(false);

const openModal = () => {
  setModalVisible(true)
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

      <ModalCloseButton pressFunction={closeModal} />

      <View style={globalStyles.modal}>
        <Text style={[globalStyles.textTitle, { marginBottom: 20 }]}> Add New Project </Text>

        <View style={globalStyles.formRow}>
          <View style={[globalStyles.formColumn, { flex: 3 }]}>
            <Text style={globalStyles.formFieldCaption}>Client Name</Text>
            <TextInput autoCorrect={false} style={globalStyles.formFieldInput} placeholder="John Smith"></TextInput>
          </View>
          
          <View style={[globalStyles.formColumn, { flex: 2 }]}>
            <Pressable onPress={toggleDatePicker}>
              <Text style={globalStyles.formFieldCaption}>Date of Contact</Text>
              <TextInput 
                autoCorrect={false} 
                style={globalStyles.formFieldInput} 
                editable={false} 
                value={contactDate}
                onPressIn={toggleDatePicker}
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
            <Text style={globalStyles.formFieldCaption}>City</Text>
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

      </View>

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
          <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
            <TextButton pressFunction={toggleDatePicker} bgcolor="maroon" text="Cancel"/>
            <TextButton pressFunction={confirmIOSDate} bgcolor="steelblue" text="Submit"/>
          </View>
        )}
        </View>
    </Modal>
    </>
  )
  
}


const styles = StyleSheet.create({})

export default ProjectsScreen