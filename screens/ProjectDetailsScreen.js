import React, { useState, useContext } from 'react'
import { View, Text, FlatList, useWindowDimensions, StyleSheet } from 'react-native'
import { Context as ProjectContext} from '../context/ProjectContext'
import { Context as ClientContext} from '../context/ClientContext'
import { Context as EmployeeContext} from '../context/EmployeeContext'
import { globalStyles } from '../styles/globalstyles'
import useGoogleCalendarLink from '../hooks/GoogleCalendarLink'
import DeleteButton from '../components/DeleteButton'
import { ModalBG, ModalBox } from '../components/Modal'
import { IconButtonV } from '../components/Button'
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
  const [modal1Visible, setModal1Visible] = useState(false)
  const [modal2Visible, setModal2Visible] = useState(false)
  const [modal3Visible, setModal3Visible] = useState(false)

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
    
    return (
      <Text style={styles.projectTextRight}>
        {currentEmployee[0].employeeName}
        </Text>
    )
  }
  
  const openModal3 = () => {
    setModal2Visible(false)
    setModal3Visible(true)
  }

  const deleteProjectNavBack = () => {
    deleteProject(currentProject)
    navigation.pop()
  }

  const modal1Content = 
  <>
    <ModalBox>
      <View style={[globalStyles.formRow]}>
        <Text style={styles.textCenterBlack}>Navigate to Project Location</Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-around', gap: 10}}> 
        <View style={{alignSelf: 'stretch', flex: 1}}>
          <IconButtonV
            pressFunction={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query${encodedAddress}`)} 
            title='Google Maps'
            icon={'map-marker-alt'} 
            color='green' 
            bgcolor='rgba(0,128,0,0.05)'
            border={true}
            size={34}
          />
        </View>
        {Platform.OS === "ios" ?
          <View style={{alignSelf: 'stretch', flex: 1}}>
            <IconButtonV
              pressFunction={() => Linking.openURL(`http://maps.apple.com/?q${encodedAddress}`)} 
              title='Apple Maps'
              iconType='FontAwesome' 
              icon={'map-pin'} 
              color='navy' 
              bgcolor='rgba(0,0,128,0.05)'
              border={true}
              size={34}
              marginV={0}
            />
          </View>
          :
          null
        }  
      </View>
    </ModalBox>
  </>

  // Modal 2 Content
  const modal2Content = 
  <>
    <ModalBox>
      <View style={[globalStyles.formRow]}>
        <Text style={styles.textCenterBlack}>Share Project</Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-around', gap: 10}}> 
        <View style={{alignSelf: 'stretch', flex: 1}}>
          <IconButtonV
            pressFunction={() => Linking.openURL(encodeURI(`sms:${employeeNumbers}${Platform.OS === "ios" ? "&" : "?"}body=${message}`))} 
            title={`Text\nWorkers`}
            icon={'sms'} 
            color='green' 
            bgcolor='rgba(0,128,0,0.05)'
            border={true}
            size={34}
            addStyles={{minHeight: 110}}
          />
        </View>
        <View style={{alignSelf: 'stretch', flex: 1}}>
          <IconButtonV
            pressFunction={() => Linking.openURL(encodeURI(`mailto:${employeeEmails}?cc=${Platform.OS === "ios" ? "&" : "?"}subject=Project&body=${message}`))} 
            title={`Email\nWorkers`}
            iconType='FontAwesome' 
            icon={'envelope'} 
            color='navy' 
            bgcolor='rgba(0,0,128,0.05)'
            border={true}
            size={36}
            addStyles={{minHeight: 110}}
          />
        </View>     
        <View style={{alignSelf: 'stretch', flex: 1}}>
          <IconButtonV
            pressFunction={openModal3} 
            title={`Add to\nCalendar`}
            icon={'calendar-alt'} 
            color='firebrick' 
            bgcolor='rgba(178,34,34,0.05)'
            border={true}
            size={35}
            addStyles={{minHeight: 110}}
          />
        </View>
      </View>
    </ModalBox>
  </>

  const modal3Content = 
  <>
    <ModalBox>
      <View style={[globalStyles.formRow]}>
        <Text style={styles.textCenterBlack}>Add Project to Calendar</Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 10}}> 
        <View style={{alignSelf: 'stretch', flex: 1}}>
          <IconButtonV
            pressFunction={() => Linking.openURL(getCalendarLink)} 
            title='Google Calendar'
            icon={'google'} 
            color='green' 
            bgcolor='rgba(0,128,0,0.05)'
            border={true}
            size={34}
          />
        </View>
        {Platform.OS === "ios" ?
          <View style={{alignSelf: 'stretch', flex: 1}}>
            <IconButtonV
              pressFunction={() => Linking.openURL('https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20240109T231500Z%2F20240109T234500Z')} 
              title='ICS'
              icon={'calendar-alt'} 
              color='navy' 
              bgcolor='rgba(0,0,128,0.05)'
              border={true}
              size={34}
            />
          </View>
          :
          ''
        }  
      </View>
    </ModalBox>
  </>

  // Assemble data for Email/Text/Calendar links
  const address = currentClient[0].address.concat(
    Boolean(unitNumber === '') ? '' : (unitNumber, ', '),
    currentClient[0].city, ' ', 
    currentClient[0].usState, ' ', 
    currentClient[0].zip
  )

  const encodedAddress = '='.concat(encodeURIComponent(address))

  const message = 
`Project Date: ${project.date}
Client: ${currentClient[0].clientName}
Address: ${address}
Tasks: ${project.tasks}
`
  const getCalendarLink = useGoogleCalendarLink(project.title, currentClient[0].clientName, project.tasks, address,  project.date, null)

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
          <Text style={styles.projectTextRight}>{project.date}
          </Text>
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
        button2function={() => setModal1Visible(true)}
        button3icon='share-square'
        button3text='Send'
        button3function={() => setModal2Visible(true)}
      />

      {/* Modal 1 (Navigate) */}
      <ModalBG
        modalVisible={modal1Visible}
        modalOnRequestClose={() => setModal1Visible(false)}
        screenWidth={width}
        closeModalButton={() => setModal1Visible(false)}
        modalContent={modal1Content}
      /> 

      {/* Modal 2 (Share Project) */}
      <ModalBG
        modalVisible={modal2Visible}
        modalOnRequestClose={() => setModal2Visible(false)}
        screenWidth={width}
        closeModalButton={() => setModal2Visible(false)}
        modalContent={modal2Content}
      /> 

      {/* Modal 3 (Calendar) */}
      <ModalBG
        modalVisible={modal3Visible}
        modalOnRequestClose={() => setModal3Visible(false)}
        screenWidth={width}
        closeModalButton={() => setModal3Visible(false)}
        modalContent={modal3Content}
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
  textCenterBlack: {
    fontWeight: 'bold', 
    fontSize: 16,
    paddingBottom: 5,
    marginTop: -10
  },

})

export default ProjectDetailsScreen