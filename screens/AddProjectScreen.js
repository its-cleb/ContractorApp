import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Context } from '../context/ProjectContext'
import ProjectForm from '../components/ProjectForm'

const AddProjectsScreen = ({ navigation }) => {

    return (  
      <ProjectForm navProps={navigation} />        
    ) 
  }

const styles = StyleSheet.create({

})

export default AddProjectsScreen