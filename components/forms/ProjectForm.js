import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { View, Text, TextInput, Pressable, Platform, useWindowDimensions, Keyboard, KeyboardAvoidingView, TouchableOpacity, Switch, FlatList, StyleSheet } from 'react-native'
import { globalStyles } from '../../styles/globalstyles'
import BottomTab3 from '../BottomTab3'
import DatePicker from '../DatePicker'
import ModalCenterBG from '../ModalCenterBG'
import IconButtonHSmall from '../IconButtonHSmall'
import { Context as ProjectContext } from '../../context/ProjectContext'
import { Context as EmployeeContext } from '../../context/EmployeeContext'

const ProjectForm = ({ isAdd, nav, clientID, payload, fromHome }) => {

  const navigation = nav
  const { width } = useWindowDimensions()

  const { state, addProject, editProject } = useContext(ProjectContext)

  // --- Project Data
  const blankProject = {
    projectID: '',
    proposalID: '',
    clientID: clientID,
    title: '',
    date: '', 
    status: 'Upcoming',
    employees: [],
    tasks: [], 
  }
  const project = isAdd ? blankProject : state.find(project => project.projectID === payload)
  const [ projectSheet, setProjectSheet ] = useState(project)

  // --- Employee Data
  const employees = useContext(EmployeeContext)
  
  let allEmployeeIDs = [] // Push Employee IDs into this array
  employees.state.map(function(obj){allEmployeeIDs.push(obj.employeeID)})

  const [ unassignedEmployeeIDs, setUnassignedEmployeeIDs ] = useState([])
  const [ currentEmployee, setCurrentEmployee ] = useState(null)

  // --- Form Data
  const blankForm = {
    title: '',
    employee: '',
    task: '',
    date: '',
    status: ''
  }
  const formData = isAdd ? blankForm : project  
  const [ form, setForm ] = useState(formData)
  const setFormState = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // --- Modal Data
  const closedModals = {
    modal1: false,
    modal2: false,
    modal3: false
  }

  const [isEdit, setIsEdit] = useState(null)
  const [currentTask, setCurrentTask] = useState(null)
  const [modalVisible, setModalVisible] = useState(closedModals)
 
  // --- Project Status Switch
  const [ isComplete, setIsComplete ] = useState(isAdd ? false : Boolean(project.status === 'Complete') ? true : false)
  
  useEffect(() => {    
    setFormState('status', isComplete ? 'Complete' : 'Upcoming')
  }, [isComplete])

  // --- Form Functions
    
  const saveProject = () => {
    isAdd ? 
      addProject(Date.now(), projectSheet.clientID, projectSheet.proposalID, form.title, projectSheet.employees, projectSheet.tasks, form.date, form.status)
    :
      editProject(projectSheet.projectID, projectSheet.clientID, projectSheet.proposalID, form.title, projectSheet.employees, projectSheet.tasks, form.date, form.status) 
    fromHome ? navigation.navigate('ProjectDetails', { isAdd: false, projectID: projectSheet.projectID, fromHome: true }) : navigation.pop() // Needs to add change for if accessed from homeScreen
  }

  const addTask = () => {
    setProjectSheet(previousState => ({
      ...previousState,
      tasks: [...previousState.tasks, form.task]
    }))
    setFormState('task', '')    
    Keyboard.dismiss()
    setModalVisible(closedModals)
  }
  const editTask = () => {
    let index = projectSheet.tasks.indexOf(currentTask)
    let copiedProjectSheet = projectSheet
    copiedProjectSheet.tasks[index] = form.task
    setProjectSheet(copiedProjectSheet)
    Keyboard.dismiss()
    setModalVisible(closedModals)
  }
  const deleteTask = () => {
    let index = projectSheet.tasks.indexOf(currentTask)
    let copiedProjectSheet = projectSheet
    copiedProjectSheet.tasks.splice(index, 1)
    setProjectSheet(copiedProjectSheet)
    setModalVisible(closedModals)
  }

  const addEmployee = (employeeRef) => {
    setProjectSheet(previousState => ({
      ...previousState,
      employees: [...previousState.employees, employeeRef]
    }))
    setModalVisible(closedModals)
  }
  const removeEmployee = () => {
    let index = projectSheet.employees.indexOf(currentEmployee.employeeID)
    let copiedProjectSheet = projectSheet
    copiedProjectSheet.employees.splice(index, 1)
    setProjectSheet(copiedProjectSheet)
    setModalVisible(closedModals)
  }

  // --- Employee Flatlists content functions
  const getEmployees = (item) => {
    let getEmployee = employees.state.filter((employeeState) => employeeState.employeeID === item )
    return (
      <TouchableOpacity onPress={() => openRemoveEmployeeModal(getEmployee[0].employeeID)} style={styles.employeeRow}>
        <Text style={styles.textLeft}>{getEmployee[0].employeeName}</Text>
        <Text style={styles.textRight}>{getEmployee[0].phone}</Text>
      </TouchableOpacity>
    )
  }
  const getUnassignedEmployees = (item) => {
    let unassignedEmployee = employees.state.filter((employeeState) => employeeState.employeeID === item )
    return (
      <TouchableOpacity onPress={() => addEmployee(unassignedEmployee[0].employeeID)} style={styles.addEmployeeRow}>
        <Text style={styles.textCenterBlack}>{unassignedEmployee[0].employeeName}</Text>
      </TouchableOpacity>
    )
  }

  // --- Modal Functions
  const closeModal = () => {
    setModalVisible(closedModals)
  }
  const openEmployeeModal = () => {
    let unassignedEmployees = allEmployeeIDs.filter(val => !projectSheet.employees.includes(val))
    setUnassignedEmployeeIDs(unassignedEmployees)
    setModalVisible({ modal1: true, modal2: false, modal3: false })
  }
  const openTaskModal = (edit, item) => {
    setIsEdit(edit)
    setCurrentTask(item)
    setFormState('task', item)    
    setModalVisible({ modal1: false, modal2: true, modal3: false })
  }
  const openRemoveEmployeeModal = (employeeRef) => {
    const employee = employees.state.filter((employeeState) => employeeState.employeeID === employeeRef )
    setCurrentEmployee(employee[0])
    setModalVisible({ modal1: false, modal2: false, modal3: true })
  }

  // --- Modal 1 Content (Add Employee)
  const modal1content = 
    <>
      <View style={styles.modalContainer}>
        <View style={[globalStyles.formRow]}>
          <Text style={[styles.textCenterBlack, {fontWeight: 'bold', paddingBottom: 5, marginTop: -10}]}>Available Employees</Text>
        </View>
        <View style={[globalStyles.formRow, {marginBottom: -10}]}>

        { Boolean(unassignedEmployeeIDs.length > 0) ?
          <FlatList 
            data={unassignedEmployeeIDs} 
            renderItem={({ item }) => getUnassignedEmployees(item)} 
          />
          :
          <View style={[styles.blankRow, {flex: 1}]}><Text style={styles.textCenter}>None</Text></View>
        }
        </View>
      </View>
    </>

  // --- Modal 2 Content (Task)
  const modal2content =
  <>
    <View style={styles.modalContainer}>
      <View style={[globalStyles.formRow]}>
        <View style={[globalStyles.formColumn, { paddingHorizontal: 10, flex: 5 }]}>
          <Text style={globalStyles.formFieldCaption}>{isEdit ? 'Edit Task' : 'Add Task'}</Text>
          <TextInput 
            autoCorrect={false} 
            style={globalStyles.formFieldInput}
            value={form.task}
            onChangeText={(text) => setFormState('task', text)}></TextInput>
        </View>
        
      </View>

      <View style={{alignSelf: 'stretch' }}>
        <IconButtonHSmall 
          pressFunction={isEdit ? editTask : addTask} 
          title={isEdit ? 'Save Edit' : 'Add Task'} 
          icon={'list'} 
          textcolor='white' 
          bgcolor='steelblue' 
        />
      </View>

      { isEdit ?
      <View style={{alignSelf: 'stretch' }}>
        <IconButtonHSmall 
          pressFunction={deleteTask} 
          title='Delete Task' 
          icon={'backspace'} 
          textcolor='white' 
          bgcolor='maroon' 
        />
      </View>
      : ''
      }
    </View>
  </>

  // --- Modal 3 Content (Remove Employee)
  const modal3content =
  <>
    <View style={styles.modalContainer}>
      <View style={[globalStyles.formRow]}>
        <Text style={[styles.textCenterBlack, {fontWeight: 'bold', paddingBottom: 5, marginTop: -10}]}>Selected Employee</Text>
      </View>
      <View style={[globalStyles.formRow, styles.removeEmployeeRow]}>
        <Text style={[styles.textCenterBlack, {paddingBottom: 5,}]}>{Boolean(currentEmployee == null) ? '' : currentEmployee.employeeName}</Text>
      </View>
      <View style={{alignSelf: 'stretch' }}>
        <IconButtonHSmall 
          pressFunction={removeEmployee} 
          title='Remove Employee' 
          icon={'backspace'} 
          textcolor='white' 
          bgcolor='maroon' 
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
              <View style={[globalStyles.formColumn, { flex: 5 }]}>
                <Text style={globalStyles.formFieldCaption}>Project Status</Text>
                <View style={[styles.statusRow, {backgroundColor: isComplete ? '#aaffaaaa' : '#fadfb9aa'}]}>
                  <Text style={[{fontWeight: 'bold', fontSize: 16, color: isComplete ? 'green' : 'chocolate'}]}>{form.status}</Text>
                </View>
              </View>
              <View style={[globalStyles.formColumn, { flex: 2, alignItems: 'center', justifyContent: 'flex-end', marginBottom: Platform.OS === 'ios' ? 4 : -2 }]}>
                <Switch 
                  onValueChange={(value) => setIsComplete(value)}
                  value={isComplete}
                />
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
                    renderItem={({ item }) => 
                      <TouchableOpacity onPress={() => openTaskModal(true, item)} style={styles.tasksRow}><Text style={styles.textLeft}>{item}</Text></TouchableOpacity> 
                    }
                  />
                  :
                  <View style={styles.blankRow}><Text style={styles.textCenter}>None</Text></View>
                }
              </View>
            </View>

      </KeyboardAvoidingView>

      <DatePicker getDate={getDate} data={form.date} show={showDatePicker} />

      <BottomTab3 
        button1icon='user-edit'
        button1text='Employees'
        button1function={openEmployeeModal}
        button2icon='edit'
        button2text='Tasks'
        button2function={() => openTaskModal(false)}
        button3icon='save'
        button3text='Save'
        button3function={saveProject}
      /> 

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

      {/* Modal 3 (Task List) */}
      <ModalCenterBG
        modalVisible={modalVisible.modal3}
        modalOnRequestClose={closeModal}
        screenWidth={width}
        closeModalButton={closeModal}
        modalContent={modal3content}
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
  statusRow: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 8,
    borderRadius: 5,
    marginVertical: 3,
    padding: 8,
    alignItems: 'center',
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
  addEmployeeRow: {
    gap: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'steelblue',
    marginVertical: 3,
    backgroundColor: 'powderblue',
    padding: 10,
    width: '100%',
    flex: 1,
    alignSelf: 'stretch'
  },
  removeEmployeeRow: {
    paddingBottom: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'dashed',
    marginVertical: 3,
    backgroundColor: '#eeeeee',
    marginBottom: 10,
    padding: 10,
    marginHorizontal: 10
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
    // flex: 1,
    color: 'gray',
    textAlign: 'center',
    fontSize: 16,
    flexWrap: 'wrap'
  },
  textCenterBlack: {
    flex: 1,
    color: 'black',
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
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
    alignSelf: 'stretch',
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