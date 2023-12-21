import React from 'react'
import StackHeader from '../components/StackHeader'
import ProjectForm from '../components/forms/ProjectForm'

const ProjectFormScreen = ({ route, navigation }) => {
  
  const isAdd = route.params.isAdd
  const clientID = route.params.clientID

  return (
    <>
      <StackHeader title={isAdd ? 'Add Project' : 'Edit Project'} fromHome={true} />
        <ProjectForm 
          isAdd={isAdd}  
          nav={navigation}
          clientID={clientID} 
          payload={route.params.payload}
        /> 
    </>
  )
}

export default ProjectFormScreen