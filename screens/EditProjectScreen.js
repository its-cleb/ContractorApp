import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Context } from '../context/ProjectContext'
import ProjectForm from '../components/ProjectForm'

const EditProjectsScreen = ({ route, navigation }) => {
 
  const { state, editProject } = useContext(Context)

  const { payload } = route.params

  const projects = state.find(projects => projects.projectID === payload)

  const projectData = Object.entries(projects)

    return (  
      <ProjectForm initialValues={projectData} navProps={navigation} onSubmit={(clientName, contactDate, phone, email, address, unitNumber, city, usState, zip, description) => editProject()}/>        
    ) 
  }

const styles = StyleSheet.create({

})

export default EditProjectsScreen