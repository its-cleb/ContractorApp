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

  // Project Data
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

  // Employee Data
  const employees = useContext(EmployeeContext)
  const employeeState = employees.state



  // Form Data
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

  // Employees List Content
  let employeesEmpty = Boolean(projectSheet.employees.length > 0)
  const employeesList = 
    employeesEmpty ?
    <FlatList data={projectSheet.employees} renderItem={({ item }) => getEmployees(item)} />
    :
    <View style={styles.blankRow}><Text style={styles.textCenter}>None</Text></View>

  // Tasks List Content
  let tasksEmpty = Boolean(projectSheet.tasks.length > 0)
  const tasksList = 
    tasksEmpty ?
    <FlatList
      data={projectSheet.tasks}
      renderItem={({ item }) => <View style={styles.tasksRow}><Text style={styles.textLeft}>{item}</Text></View> }
    />
    :
    <View style={styles.blankRow}><Text style={styles.textCenter}>None</Text></View>
  
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
  
  // Date Picker
  const [ showDatePicker, setShowDatePicker ] = useState(true)

  const toggleDatePicker = () => {
    setShowDatePicker(() => !showDatePicker)
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
                  onChangeText={(text) => setFormState('date', text)}
                ></TextInput>
              </Pressable>
            </View>
            </View>
            <View style={[globalStyles.formRow, styles.row]}>
              <View style={[globalStyles.formColumn, { flex: 1 }]}>
                <Text style={globalStyles.formFieldCaption}>Assigned Employees</Text>
                {employeesList}
              </View>
            </View>
            <View style={[globalStyles.formRow, styles.row]}>
              <View style={[globalStyles.formColumn, { flex: 1 }]}>
                <Text style={globalStyles.formFieldCaption}>Project Tasks</Text>
                {tasksList}
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
  blankRow: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'gray',
    marginVertical: 3,
    backgroundColor: '#eeeeee',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1
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
  textCenter: {
    flex: 1,
    color: 'gray',
    textAlign: 'center',
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