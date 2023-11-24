import React from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, Pressable } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import { useNavigation } from '@react-navigation/native'
import IconButtonHContent from '../components/IconButtonHContent'
import TextButton from '../components/TextButton'
import ModalCloseButton from '../components/ModalCloseButton'


const ProjectsScreen = () => {

// Modal Control
const [modalVisible, setModalVisible] = useState(false);

const openModal = () => {
  setModalVisible(true)
}
const closeModal = () => {
  setModalVisible(false)
}

  return (
    <>
    <View style={globalStyles.containerHCentered}>
      <Text style={globalStyles.textTitle}>Projects</Text>
    </View>

    <IconButtonHContent pressFunction={openModal} title="Add Project" icon="plus" bgcolor="#00000000" textcolor="steelblue"/> 
    
    <Modal
      animationType="slide"
      visible={modalVisible}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>

      <ModalCloseButton pressFunction={closeModal} />

      <View style={globalStyles.modal}>
        <Text> Test </Text>
        <TextButton pressFunction={closeModal} bgcolor="steelblue" text="text"/>
      </View>
    </Modal>
    </>
  )
  
}


const styles = StyleSheet.create({})

export default ProjectsScreen