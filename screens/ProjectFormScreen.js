import React from 'react'
import StackHeader from '../components/StackHeader'

const ProjectFormScreen = ({ route, navigation }) => {
  
  const isAdd = route.params.isAdd
  

  return (
    <>
      <StackHeader title={isAdd ? 'Add Project' : 'Edit Project'} />

    </>
  )
}

export default ProjectFormScreen