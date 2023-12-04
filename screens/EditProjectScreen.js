import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Context } from '../context/ProjectContext'
import ProjectForm from '../components/ProjectForm'

const EditProjectsScreen = ({ route }) => {
 
  const { state } = useContext(Context)

  const { payload } = route.params

  const projects = state.find(projects => projects.projectID === payload)

  const projectData = Object.entries(projects)

    return (  
      <ProjectForm initialValues={projectData} />        
    ) 
  }

const styles = StyleSheet.create({

})

export default EditProjectsScreen