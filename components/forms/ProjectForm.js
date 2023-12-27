import React from 'react'
import { useState, useContext } from 'react'
import { View, Text, TextInput, Pressable, Platform, useWindowDimensions, KeyboardAvoidingView, Switch, FlatList, StyleSheet } from 'react-native'
import { globalStyles } from '../../styles/globalstyles'
import BottomTab3 from '../BottomTab3'
import DatePicker from '../DatePicker'
import ModalCenterBG from '../ModalCenterBG'
import IconButtonHSmall from '../IconButtonHSmall'
import { Context as ProjectContext } from '../../context/ProjectContext'
import { Context as EmployeeContext } from '../../context/EmployeeContext'

const ProjectForm = ({ isAdd, nav, clientID, payload }) => {

  const navigation = nav
  const { width } = useWindowDimensions()

  const { state, addProject, editProject } = useContext(ProjectContext)

  // Project Data
  const blankProject = {
    projectID: '',
    proposalID: '',
    clientID: clientID,
    title: '',
    date: '', 
    employees: [],
    tasks: [], 
  }
  const project = isAdd ? blankProject : state.find(project => project.projectID === payload)
  const [ projectSheet, setProjectSheet ] = useState(project)

  console.log('projectSheet: ', projectSheet)

  // Employee Data
  const employees = useContext(EmployeeContext)
  const employeeState = employees.state

  // Form Data
  const blankForm = {
    title: '',
    employee: '',
    task: '',
    date: '',
  }
  const formData = isAdd ? blankForm : project  
  const [ form, setForm ] = useState(formData)
  const setFormState = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }
  
  // Form Functions
  const saveProject = () => {
    isAdd ? 
      addProject(Date.now(), projectSheet.clientID, projectSheet.proposalID, form.title, projectSheet.employees, projectSheet.tasks, form.date)
    :
      editProject(projectSheet.projectID, projectSheet.clientID, projectSheet.proposalID, form.title, projectSheet.employees, projectSheet.tasks, form.date) 
    navigation.pop() // Needs to add change for if accessed from homeScreen
  }

  const addTask = () => {
    let currentTasks = projectSheet.tasks
    currentTasks.push(form.task)
    form.task = ''
    setModalVisible(closedModals)
    console.log(projectSheet.tasks)
  }

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

  // --- Modals ---
  const closedModals = {
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false
  }

  const [modalVisible, setModalVisible] = useState(closedModals)

  const closeModal = () => {
    setModalVisible(closedModals)
  }
  const openEmployeeModal = () => {
    setModalVisible({ modal1: true, modal2: false, modal3: false, modal4: false })
  }
  const openTaskModal = () => {
    setModalVisible({ modal1: false, modal2: true, modal3: false, modal4: false })
  }

  // Modal 1 Content
  const modal1content = 
    <>
      <View><Text>TEst</Text></View>
    </>

  // Modal 2 Content
  const modal2content =
  <>
    <View style={styles.modalContainer}>
      <View style={[globalStyles.formRow]}>
        <View style={[globalStyles.formColumn, { paddingHorizontal: 10, flex: 5 }]}>
          <Text style={globalStyles.formFieldCaption}>Add Task</Text>
          <TextInput 
            autoCorrect={false} 
            style={globalStyles.formFieldInput}
            value={form.task}
            onChangeText={(text) => setFormState('task', text)}></TextInput>
        </View>
        
      </View>

      <View style={{alignSelf: 'stretch' }}>
        <IconButtonHSmall 
          pressFunction={addTask} 
          title={'Add Task'} 
          icon={'list'} 
          textcolor='white' 
          bgcolor='steelblue' 
        />
      </View>
    </View>
    </>

  // --- Date Picker ---
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
                { Boolean(projectSheet.employees.length > 0) ?
                  <FlatList data={projectSheet.employees} renderItem={({ item }) => getEmployees(item)} />
                  :
                  <View style={styles.blankRow}><Text style={styles.textCenter}>None</Text></View>
                }
              </View>
            </View>
            <View style={[globalStyles.formRow, styles.row]}>
              <View style={[globalStyles.formColumn, { flex: 1 }]}>
                <Text style={globalStyles.formFieldCaption}>Project Tasks</Text>
                { Boolean(projectSheet.tasks.length > 0) ?
                  <FlatList
                    data={projectSheet.tasks}
                    renderItem={({ item }) => <View style={styles.tasksRow}><Text style={styles.textLeft}>{item}</Text></View> }
                  />
                  :
                  <View style={styles.blankRow}><Text style={styles.textCenter}>None</Text></View>
                }
              </View>
            </View>

      </KeyboardAvoidingView>

      <DatePicker getDate={getDate} data={form.date} show={showDatePicker} />

      {/* Modal 1 (Employee List) */}
      <ModalCenterBG
        modalVisible={modalVisible.modal1}
        modalOnRequestClose={closeModal}
        screenWidth={width}
        closeModalButton={closeModal}
        modalContent={modal1content}
      /> 

      {/* Modal 2 (Task List) */}
      <ModalCenterBG
        modalVisible={modalVisible.modal2}
        modalOnRequestClose={closeModal}
        screenWidth={width}
        closeModalButton={closeModal}
        modalContent={modal2content}
      /> 

      <BottomTab3 
        button1icon='user-edit'
        button1text='Employees'
        button1function={openEmployeeModal}
        button2icon='edit'
        button2text='Tasks'
        button2function={openTaskModal}
        button3icon='save'
        button3text='Save'
        button3function={saveProject}
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
    zIndex: 1
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
    flex: 1,
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

  // Modals
  modalContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
  },

  // Modal 1 
  lineSelectionBox: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  lineSelectionButtonsBox: {
    marginBottom: -10,
    marginTop: 10,
    width: '100%'
  },

  // Modal 2 & 3
  modalBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
})

export default ProjectForm