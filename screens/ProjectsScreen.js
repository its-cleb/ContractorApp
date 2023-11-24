import React from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, Pressable } from 'react-native'
import { SimpleLineIcons, MaterialIcons, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalstyles'
import { useNavigation } from '@react-navigation/native'
import IconButtonHContent from '../components/IconButtonHContent'
import ActiveProjects from '../components/ActiveProjects'
import TextButton from '../components/TextButton'


const ProjectsScreen = () => {
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

      <View>
        <Text> Test </Text>
        <TextButton pressFunction={closeModal} bgcolor="steelblue" text="text"/>
      </View>
    </Modal>
    </>
  )
  
}


const styles = StyleSheet.create({})

export default ProjectsScreen