import React, { useContext } from 'react'
import { Context } from '../context/ProjectContext'
import ProjectForm from '../components/projects/ProjectForm'

const EditProjectsScreen = ({ route, navigation }) => {
 
  const { state } = useContext(Context)

  const { payload } = route.params

  const projects = state.find(projects => projects.projectID === payload)

  // Destructrues projects from object to be usable by the child component
  const projectData = Object.entries(projects)

    return (  
      <ProjectForm 
        initialValues={projectData} 
        navProp={navigation} 
        payloadProp={payload}
      />        
    ) 
  }

export default EditProjectsScreen