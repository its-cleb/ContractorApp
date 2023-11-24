import React from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Pressable } from 'react-native'
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

        <Text style={[globalStyles.textTitle, { marginBottom: 20 }]}> Add New Project </Text>

        <View style={globalStyles.formRow}>
          <View style={[globalStyles.formColumn, { flex: 1 }]}>
            <Text style={globalStyles.formFieldCaption}>Project Name</Text>
            <TextInput autoCorrect={false} style={globalStyles.formFieldInput}></TextInput>
          </View>

          <View style={[globalStyles.formColumn, { flex: 1 }]}>
            <Text style={globalStyles.formFieldCaption}>Project Name</Text>
            <TextInput autoCorrect={false} style={globalStyles.formFieldInput}></TextInput>
          </View>
        </View>

        <View style={globalStyles.formRow}>
          <View style={[globalStyles.formColumn, { flex: 2 }]}>
            <Text style={globalStyles.formFieldCaption}>Address</Text>
            <TextInput autoCorrect={false} style={globalStyles.formFieldInput}></TextInput>
          </View>

          <View style={[globalStyles.formColumn, { flex: 1 }]}>
            <Text style={globalStyles.formFieldCaption}>City</Text>
            <TextInput autoCorrect={false} style={globalStyles.formFieldInput}></TextInput>
          </View>

          <View style={[globalStyles.formColumn, { flex: 1 }]}>
            <Text style={globalStyles.formFieldCaption}>ZIP</Text>
            <TextInput autoCorrect={false} style={globalStyles.formFieldInput}></TextInput>
          </View>

        </View>
        
        <View style={globalStyles.formRow}>
          <View style={[globalStyles.formColumn, { flex: 1 }]}>
            <Text style={globalStyles.formFieldCaption}>Project Description</Text>
            <TextInput autoCorrect={false} style={globalStyles.formFieldInput}></TextInput>
          </View>
        </View>

        <TextButton pressFunction={closeModal} bgcolor="steelblue" text="Add Project"/>

      </View>
    </Modal>
    </>
  )
  
}


const styles = StyleSheet.create({})

export default ProjectsScreen