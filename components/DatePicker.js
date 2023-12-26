import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Keyboard } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import TextButton from './TextButton'

// Required code in Parent:
  // // Date Picker
  // const [ showDatePicker, setShowDatePicker ] = useState(true)

  // const toggleDatePicker = () => {
  //   setShowDatePicker(!showDatePicker)
  // }

  // function getDate(data) { // Receive Date from child component
  //   setFormState('date', data)
  // }

const DatePicker = props => {

  const [ date, setDate] = useState(new Date())
  const [ newDate, setNewDate] = useState(props.data)
  const [ showPicker, setShowPicker] = useState(false)
  const [ renderCount, setRenderCount ] = useState(0)

  // Toggle on parent state change
  useEffect(() => {
    setRenderCount(renderCount + 1)
    if (renderCount > 0) {
      setShowPicker(!showPicker)
      console.log('useEffect:', renderCount)
    } else { console.log('useEffect:', renderCount) }    
  }, [props.show])

  // Send date on change
  useEffect(() => {    
    props.getDate(newDate)
  }, [newDate])

  // Date Picker Functions
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
        setNewDate(Intl.DateTimeFormat('en-US').format(currentDate))
      }
    } else {
      toggleDatePicker()
    }
  }

  const confirmIOSDate = () => {
    setNewDate(Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'numeric', day: 'numeric'}).format(date))
    toggleDatePicker()
  }

  // --- Main Return --- 
  return (
    <View style={styles.datePickerBoxIOS}>
    {showPicker && (
      <DateTimePicker 
        mode='date'
        display='spinner'
        value={date}
        onChange={onChange}
        style={styles.datePicker}
        textColor='black'
      />
      )}

      {showPicker &&  Platform.OS === 'ios' && (
        <View style={styles.datePickerButtonsIOS}>
          <View style={{ flex: 1 }}>
            <TextButton pressFunction={closeDatePickerAndKeyboard} bgcolor="maroon" text="Close Date Picker"/>
          </View>
          <View style={{ flex: 1 }}>
            <TextButton style={{ flex: 1 }} pressFunction={confirmIOSDate} bgcolor="steelblue" text="Add Date"/>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  datePickerBoxIOS: {
    backgroundColor: '#eeeeff',
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderColor: '#999999',
    zIndex: 100
  },
  datePicker: {
    height: 140,
    marginTop: -10,
    marginBottom: -20,
    zIndex: 100,
    paddingBottom: 200

  },
  datePickerButtonsIOS: {
    paddingBottom: 40,
    flexDirection: 'row', 
    gap: 10, 
    marginHorizontal: 20
  }
})

export default DatePicker