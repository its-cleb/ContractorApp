import React from 'react'
import { useState, useContext } from 'react'
import { View, Text, TextInput, Pressable, Platform, Keyboard, KeyboardAvoidingView, Switch, FlatList, StyleSheet } from 'react-native'
import { globalStyles } from '../../styles/globalstyles'
import BottomTab3 from '../BottomTab3'
import DatePicker from '../DatePicker'
import ModalCenterBG from '../ModalCenterBG'
import { Context as ProjectContext } from '../../context/ProjectContext'
import { Context as EmployeeContext } from '../../context/EmployeeContext'

const ProjectForm = ({ isAdd, nav, clientID, payload }) => {

  const { state, addProject, editProject } = useContext(ProjectContext)

  // Set Project Data
  const blankProject = {
    projectID: Date.now(),
    proposalID: '',
    clientID: clientID,
    title: '',
    date: '', 
    employees: '',
    tasks: '', 
  }
  const project = isAdd ? blankProject : state.find(project => project.projectID === payload)
  const [ projectSheet, setProjectSheet ] = useState(project)

  // Set Employee Data
  const employees = useContext(EmployeeContext)
  const employeeState = employees.state

  // Employee Flatlist content function
  const getEmployees = (item) => {
    const currentEmployee = employeeState.filter((employeeState) => employeeState.employeeID === item )
    return (
    <View style={styles.employeeRow}>
      <Text style={styles.textLeft}>{currentEmployee[0].employeeName}</Text>
      <Text style={styles.textRight}>{currentEmployee[0].phone}</Text>
    </View>
    )
  }

  // Set Form Data
  const blankForm = {
    title: '',
    taskName: '',
    employee: ''
  }
  const formData = isAdd ? blankForm : project  
  const [ form, setForm ] = useState(formData)
  const setFormState = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Date Picker
  const [ showDatePicker, setShowDatePicker ] = useState(true)

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker)
  }

  function getDate(data) { // Receive Date from child component
    setFormState('date', data)
  }

  // -----| Main Return |-----
  return (
    <>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -500} style={styles.contentBox}>
            <View style={[globalStyles.formRow, styles.row]}>
              <View style={[globalStyles.formColumn, { flex: 5 }]}>
                <Text style={globalStyles.formFieldCaption}>Project Title</Text>
                <TextInput 
                  autoCorrect={false} 
                  style={globalStyles.formFieldInput}
                  value={form.title}
                  onChangeText={(text) => setFormState('title', text)}>
                </TextInput>
              </View>
              <View style={[globalStyles.formColumn, { flex: 2 }]}>
              <Pressable onPress={toggleDatePicker}>
                <Text style={globalStyles.formFieldCaption}>Date</Text>
                <TextInput 
                  autoCorrect={false} 
                  style={globalStyles.formFieldInput} 
                  editable={false} 
                  value={form.date}
                  onPressIn={toggleDatePicker}
                  onChangeText={(text) => toggleDatePicker}
                ></TextInput>
              </Pressable>
            </View>
            </View>
            <View style={[globalStyles.formRow, styles.row]}>
              <View style={[globalStyles.formColumn, { flex: 1 }]}>
                <Text style={globalStyles.formFieldCaption}>Assigned Employees</Text>
                <FlatList
                  data={projectSheet.employees}
                  renderItem={({ item }) => getEmployees(item)}
                />
              </View>
            </View>
            <View style={[globalStyles.formRow, styles.row]}>
              <View style={[globalStyles.formColumn, { flex: 1 }]}>
                <Text style={globalStyles.formFieldCaption}>Project Tasks</Text>
                <FlatList
                  data={projectSheet.tasks}
                  renderItem={({ item }) => <View style={styles.tasksRow}><Text style={styles.textLeft}>{item}</Text></View> }
                />
              </View>
            </View>

      </KeyboardAvoidingView>

      <DatePicker getDate={getDate} data={form.date} show={showDatePicker} />

      <BottomTab3 
        button1icon='user-edit'
        button1text='Employees'
        // button1function={}
        button2icon='edit'
        button2text='Tasks'
        // button2function={}
        button3icon='save'
        button3text='Save'
      /> 

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
  row: {
    marginBottom: 5
  }, 
  employeeRow: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'steelblue',
    marginVertical: 3,
    backgroundColor: 'powderblue',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  textLeft: {
    flex: 1,
    color: 'black',
    textAlign: 'left',
    fontSize: 16,
  },
  textRight: {
    flex: 1,
    color: 'black',
    textAlign: 'right',
    fontSize: 16,
    flexWrap: 'wrap'
  },
  tasksRow: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'darkkhaki',
    marginVertical: 3,
    backgroundColor: 'khaki',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
})

export default ProjectForm