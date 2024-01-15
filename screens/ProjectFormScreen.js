import React, { useState, useContext, useEffect } from 'react'
import { View, Text, Pressable, Platform, useWindowDimensions, Keyboard, KeyboardAvoidingView, TouchableOpacity, Switch, FlatList, StyleSheet } from 'react-native'
import BottomTab3 from '../components/BottomTab3'
import DatePicker from '../components/DatePicker'
import ModalCenterBG from '../components/ModalCenterBG'
import IconButtonHSmall from '../components/IconButtonHSmall'
import StackHeader from '../components/StackHeader'
import { Form, Row, Column, Caption, Field } from '../components/Form'
import { Context as ProjectContext } from '../context/ProjectContext'
import { Context as EmployeeContext } from '../context/EmployeeContext'


const ProjectFormScreen = ({ route, navigation }) => {
  
  const isAdd = route.params.isAdd
  const clientID = route.params.clientID
  const fromHome = route.params.fromHome

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
  const project = isAdd ? blankProject : state.find(project => project.projectID === route.params.payload)
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

  // --- Validation Box
  const [ validationBox, setValidationBox ] = useState(false)

  // --- Form Functions

  const validateForm = () => {
    Boolean(form.title === '' || form.date === '') ?
      setValidationBox(true)
      :
      saveProject()
  }

  const saveProject = () => {
    isAdd ? 
      addProject(Date.now(), projectSheet.clientID, projectSheet.proposalID, form.title, projectSheet.employees, projectSheet.tasks, form.date, form.status)
      :
      editProject(projectSheet.projectID, projectSheet.clientID, projectSheet.proposalID, form.title, projectSheet.employees, projectSheet.tasks, form.date, form.status) 
    fromHome ? 
      navigation.navigate('ProjectDetails', { isAdd: false, projectID: projectSheet.projectID, fromHome: true }) 
      : 
      navigation.pop() // Needs to add change for if accessed from homeScreen
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

  // --- Date Picker ---
  const [ showDatePicker, setShowDatePicker ] = useState(true)

  const toggleDatePicker = () => {
    setShowDatePicker(() => !showDatePicker)
  }
  function getDate(data) { // Receive Date from child component
    setFormState('date', data)
  }

  // --- Modal 1 Content (Add Employee)
  const modal1content = 
    <>
      <View style={styles.modalContainer}>
        <Row>
          <Text style={[styles.textCenterBlack, {fontWeight: 'bold', paddingBottom: 5, marginTop: -10}]}>Available Employees</Text>
        </Row>
        <Row marginB={-15}> 
          {!!unassignedEmployeeIDs.length > 0 ?
            <FlatList 
              data={unassignedEmployeeIDs} 
              renderItem={({ item }) => getUnassignedEmployees(item)} 
            />
            :
            <View style={[styles.blankRow, {flex: 1}]}><Text style={styles.textCenter}>None</Text></View>
          }
        </Row>
      </View>
    </>

  // --- Modal 2 Content (Task)
  const modal2content =
  <>
    <View style={styles.modalContainer}>
      <Row>
        <Column flex={5} addStyles={{ paddingHorizontal: 10}}>
          <Caption>{isEdit ? 'Edit Task' : 'Add Task'}</Caption>
          <Field value={form.task} press={(text) => setFormState('task', text)}/>
        </Column>
      </Row>

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
      <Row>
        <Text style={[styles.textCenterBlack, {fontWeight: 'bold', paddingBottom: 5, marginTop: -10}]}>Selected Employee</Text>
      </Row>
      <Row addStyles={styles.removeEmployeeRow}>
        <Text style={[styles.textCenterBlack, {paddingBottom: 5}]}>{Boolean(currentEmployee == null) ? '' : currentEmployee.employeeName}</Text>
      </Row>
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

  return (
    <>
      <StackHeader title={isAdd ? 'Add Project' : 'Edit Project'} navFunction={() => navigation.pop()} />

      <View style={[styles.validationBox, {display: validationBox ? 'flex' : 'none' }]}>
        <Text style={styles.validationText}>Project must have Title and Date to be saved</Text>
      </View>

      <Form>
        <Row marginB={5}>
          <Column flex={5}>
            <Caption>Project Title</Caption>
            <Field value={form.title} press={(text) => setFormState('title', text)}/>
          </Column>
          <Column flex={2}>
            <Pressable onPress={toggleDatePicker}>
              <Caption>Date</Caption>
              <Field value={form.date} pressIn={toggleDatePicker} press={(text) => setFormState('date', text)}/>
            </Pressable>
          </Column>
        </Row>

        <Row marginB={5}>
          <Column flex={5}>
            <Caption>Project Status</Caption>
            <View style={[styles.statusRow, {backgroundColor: isComplete ? '#aaffaaaa' : '#fadfb9aa'}]}>
              <Text style={[{fontWeight: 'bold', fontSize: 16, color: isComplete ? 'green' : 'chocolate'}]}>{form.status}</Text>
            </View>
          </Column>
          <Column flex={2} addStyles={{alignItems: 'center', justifyContent: 'flex-end', marginBottom: Platform.OS === 'ios' ? 4 : -2 }}>
            <Switch 
              onValueChange={(value) => setIsComplete(value)}
              value={isComplete}
            />
          </Column>
        </Row>

        <Row marginB={5}>
          <Column flex={1}>
            <Caption>Assigned Employees</Caption>
            {!!projectSheet.employees.length > 0 ?
              <FlatList data={projectSheet.employees} renderItem={({ item }) => getEmployees(item)} />
              :
              <View style={styles.blankRow}><Text style={styles.textCenter}>None</Text></View>
            }
          </Column>
        </Row>

        <Row marginB={5}>
          <Column flex={1}>
            <Caption>Project Tasks</Caption>
            {!!projectSheet.tasks.length > 0 ?
              <FlatList
                data={projectSheet.tasks}
                renderItem={({ item }) => 
                  <TouchableOpacity onPress={() => openTaskModal(true, item)} style={styles.tasksRow}><Text style={styles.textLeft}>{item}</Text></TouchableOpacity> 
                }
              />
              :
              <View style={styles.blankRow}><Text style={styles.textCenter}>None</Text></View>
            }
          </Column>
        </Row>

      </Form>

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
        button3function={validateForm}
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
  validationBox: {
    padding: 5,
    backgroundColor: 'rgba(255,34,34,0.2)'
  },
  validationText: {
    textAlign: 'center',
    color: 'maroon'
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

export default ProjectFormScreen