import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Context as ProjectContext} from '../context/ProjectContext'
import { Context as ClientContext} from '../context/ClientContext'
import { Context as EmployeeContext} from '../context/EmployeeContext'
import DeleteButton from '../components/DeleteButton'
import IconButtonHSmall from '../components/IconButtonHSmall'
import StackHeader from '../components/StackHeader'
import BottomTab3 from '../components/BottomTab3'

const ProjectDetailsScreen = ({ route, navigation }) => {

  const { state, deleteProject } = useContext(ProjectContext)
  
  const currentProject = route.params.projectID
  const project = state.find((project) => project.projectID === currentProject)

  const clients = useContext(ClientContext)
  const currentClient = clients.state.filter((client) => client.clientID === project.clientID)

  const employees = useContext(ClientContext)
  const workerIDs = project.employees

  // const workers = 
  console.log(workerIDs)
  
  const deleteProjectNavBack = () => {
    deleteProject(payload)
    navigation.pop()
  }
  
  return (  
    <>
      <StackHeader title='Project Details'/>

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
            <Text style={styles.projectTextRight}>{employee.employeeName}</Text>
          </View>  
        </View>
      </View>
      
      <BottomTab3 
        button1icon='edit'
        button1text='Edit Project'
        // button1function={}
        button2icon='map-marker-alt'
        button2text='Navigate'
        // button2function={}
        button3icon='sms'
        button3text='Send'
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
})

export default ProjectDetailsScreen