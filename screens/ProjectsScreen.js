import React from 'react'
import { useState, useContext, useRef, forwardRef, useImperativeHandle } from 'react'
import { View, Text, StyleSheet, Modal, TextInput, Pressable, Platform, Keyboard, KeyboardAvoidingView } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import IconButtonHContent from '../components/IconButtonHContent'
import TextButton from '../components/TextButton'
import ModalCloseButton from '../components/ModalCloseButton'
import DateTimePicker from '@react-native-community/datetimepicker'
import ProjectFlatlist from '../contentcomponents/ProjectsFlatlist'
import { Context } from '../context/ProjectContext'
import AddProjectModal from '../contentcomponents/AddProjectModal'

const ProjectsScreen = () => {
  
  const { data, addProject } = useContext(Context)

  let childRef = useRef(null)

  // --- Modal Control ---
  const [modalVisible, setModalVisible] = useState(false);

  const addProjectButton = () => {
    childRef.current.openModal()
  }
  const closeModal = () => {
    setModalVisible(false)
    addProject()
  }

  return (
    <>
      <View style={globalStyles.containerHCentered}>
        <Text style={globalStyles.textTitle}>Active Projects</Text>
      </View>

      <ProjectFlatlist />

    <IconButtonHContent pressFunction={() => childRef.current.addProjectButton()} title="Add New Project" icon="plus" bgcolor="#00000000" textcolor="steelblue"/> 
    
    {/* --- Project Details modal --- */}
    <AddProjectModal ref={childRef}/>
    
    </>
  ) 
  }

export default ProjectsScreen