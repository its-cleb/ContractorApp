import React, { useState, useContext, useEffect } from 'react'
import { View, Text, FlatList, useWindowDimensions, StyleSheet } from 'react-native'
import { Context as ProjectContext} from '../context/ProjectContext'
import { Context as ClientContext} from '../context/ClientContext'
import { Context as EmployeeContext} from '../context/EmployeeContext'
import { globalStyles } from '../styles/globalstyles'
import IconButtonVLarge from '../components/IconButtonV'
import DeleteButton from '../components/DeleteButton'
import ModalCenterBG from '../components/ModalCenterBG'
import StackHeader from '../components/StackHeader'
import BottomTab3 from '../components/BottomTab3'
import * as Linking from 'expo-linking'

const ProjectDetailsScreen = ({ route, navigation }) => {

  const { state, deleteProject } = useContext(ProjectContext)
  
  const currentProject = route.params.projectID
  const project = state.find((project) => project.projectID === currentProject)

  const clients = useContext(ClientContext)
  const currentClient = clients.state.filter((client) => client.clientID === project.clientID)

  const employees = useContext(EmployeeContext)

  // Modal
  const { width } = useWindowDimensions()
  const [modalVisible, setModalVisible] = useState(false)

  // Determine Originating Page
  const fromHome = route.params.fromHome
  const fromClient = route.params.fromClient

  let employeeNumbers = []
  let employeeEmails = []
  let unitNumber = Boolean(currentClient[0].unitNumber === undefined) ? '' : (', ' + currentClient[0].unitNumber)

  // Employee Flatlist content function
  const getEmployees = (item) => {
    const currentEmployee = employees.state.filter((employeeState) => employeeState.employeeID === item )
    employeeNumbers.push(currentEmployee[0].phone.replace(/[^\w ]/g, ''))
    employeeEmails.push(currentEmployee[0].email)
    console.log(employeeEmails)
    
    return (
      <Text style={styles.projectTextRight}>
        {currentEmployee[0].employeeName}
        </Text>
    )
  }
  
  const deleteProjectNavBack = () => {
    deleteProject(currentProject)
    navigation.pop()
  }

  // Modal 1 Content
  const modal1Content = 
  <>
    <View style={styles.modalContainer}>
      <View style={[globalStyles.formRow]}>
        <Text style={styles.textCenterBlack}>Share Project</Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}> 
        <View style={{alignSelf: 'stretch', flex: 1}}>
          <IconButtonVLarge
            pressFunction={() => Linking.openURL(encodeURI(`sms:${employeeNumbers}${Platform.OS === "ios" ? "&" : "?"}body=${message}`))} 
            title='Text Workers'
            icon={'sms'} 
            color='green' 
            bgcolor='white'
            border={true}
            size={34}
          />
        </View>
        <View style={{alignSelf: 'stretch', flex: 1}}>
          <IconButtonVLarge
            pressFunction={() => Linking.openURL(encodeURI(`mailto:${employeeEmails}?cc=${Platform.OS === "ios" ? "&" : "?"}subject=Project&body=${message}`))} 
            title='Email Workers'
            iconType='FontAwesome' 
            icon={'envelope'} 
            color='navy' 
            bgcolor='white'
            border={true}
            size={34}
          />
        </View>     
        <View style={{alignSelf: 'stretch', flex: 1}}>
          <IconButtonVLarge
            pressFunction={() => Linking.openURL(encodeURI(`sms:${employeeNumbers}${Platform.OS === "ios" ? "&" : "?"}body=${message}`))} 
            title='Add to Calendar' 
            icon={'calendar-alt'} 
            color='firebrick' 
            bgcolor='white'
            border={true}
            size={34}
          />
        </View>
      </View>
    </View>
  </>


  const message = 
`Project Date: ${project.date}
Client: ${currentClient[0].clientName}
Address: ${currentClient[0].address}${unitNumber}, ${currentClient[0].city}, ${currentClient[0].zip}
Tasks: ${project.tasks}
`

  return (  
    <>
      <StackHeader title='Project Details' navFunction={() => fromHome ? navigation.replace('ProjectsScreen') : navigation.pop()} />

      <View style={styles.projectContainer}>
        <View style={styles.projectHeader}>
          <Text style={styles.projectTextHeader}>{project.title}</Text>
          <DeleteButton pressFunction={deleteProjectNavBack}/>
        </View>
        <View style={styles.projectRow}>
          <Text style={[styles.projectTextBold, styles.flexOne]}>Start Date:</Text>
          <Text style={styles.projectTextRight}>{project.date}</Text>
        </View>
        <View style={styles.projectRow}>
          <Text style={[styles.projectTextBold, styles.flexOne]}>Status:</Text>
          <Text style={[styles.projectTextRight, {fontWeight: 'bold', color: Boolean(project.status === 'Upcoming') ? 'orange' : 'green'}]}>
            {project.status}
          </Text>
        </View>
        <View style={styles.projectRow}>
          <Text style={[styles.projectTextBold, styles.flexOne]}>Client:</Text>
          <Text style={styles.projectTextRight}>{currentClient[0].clientName}</Text>
        </View>
        <View style={styles.projectRow}>
          <Text style={[styles.projectTextBold]}>Address:</Text>
          <View style={styles.flexOne}>
            <Text style={styles.projectTextRight}>{currentClient[0].address}, {currentClient[0].unitNumber}</Text>
            <Text style={styles.projectTextRight}>{currentClient[0].city}, {currentClient[0].usState} {currentClient[0].zip}</Text>
          </View>  
        </View>
        <View style={styles.projectRow}>
          <Text style={[styles.projectTextBold]}>Workers:</Text>
          <View style={styles.flexOne}>
            <FlatList
              data={project.employees}
              renderItem={({ item }) => getEmployees(item)}
            />
          </View>  
        </View>
        <View style={styles.projectRow}>
          <Text style={[styles.projectTextBold]}>Tasks:</Text>
          <View style={styles.flexOne}>
            <FlatList
              data={project.tasks}
              renderItem={({ item }) => <Text style={styles.projectTextRight}>{item}</Text> }
            />
          </View>  
        </View>
      </View>
      
      <BottomTab3 
        button1icon='edit'
        button1text='Edit Project'
        button1function={() => fromClient ? 
          navigation.navigate('ClientProjectForm', {isAdd:false, clientID: currentClient[0].clientID, payload: currentProject, fromHome, fromClient})        
          :
          navigation.navigate('ProjectForm', {isAdd:false, clientID: currentClient[0].clientID, payload: currentProject, fromHome, fromClient})
        }
        button2icon='map-marker-alt'
        button2text='Navigate'
        // button2function={}
        button3icon='share-square'
        button3text='Send'
        button3function={() => setModalVisible(true)}
      />

      {/* Modal 1 (Employee List) */}
      <ModalCenterBG
        modalVisible={modalVisible}
        modalOnRequestClose={() => setModalVisible(false)}
        screenWidth={width}
        closeModalButton={() => setModalVisible(false)}
        modalContent={modal1Content}
      /> 

    </>
  ) 
}

const styles = StyleSheet.create({
  projectContainer: {
    borderRadius: 5,
    margin: 10,
    paddingBottom: 8,
  },
  projectHeader: {
    flexDirection: 'row',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#666666',
    paddingBottom: 3,
    paddingTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  projectRow: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 5,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderRadius: 5,
    borderWidth: 1,
  },
  projectText: {
    color: 'black',
    fontSize: 16,
  },
  projectTextHeader: {
    fontWeight: 'bold', 
    fontSize: 24,
    flex: 1
  },
  projectTextBold: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  projectTextRight: {
    color: 'black',
    textAlign: 'right',
    fontSize: 16,
  },
  flexOne: {
    flex: 1,
  },
  contentBox: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    flex: 1,
    zIndex: 1
  },
  textCenterBlack: {
    fontWeight: 'bold', 
    fontSize: 16,
    paddingBottom: 5,
    marginTop: -10
  },

  // Modals
  modalContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
    alignSelf: 'stretch',
  },
})

export default ProjectDetailsScreen