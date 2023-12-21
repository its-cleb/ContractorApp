import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { View, TextButton, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { globalStyles } from '../styles/globalstyles'

const DatePicker = (props, ref) => {

  useImperativeHandle(ref, () => {
    toggleDatePicker: () => { toggleDatePicker() }
  })

  console.log(ref)

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
            <TextButton style={[globalStyles.formColumn, { flex: 1 }]} pressFunction={confirmIOSDate} bgcolor="steelblue" text="Add Date"/>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({

})

export default DatePicker