import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SimpleLineIcons, MaterialIcons, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalstyles'
import { useNavigation } from '@react-navigation/native'
import IconButtonHContent from '../components/IconButtonHContent'
import ActiveProjects from '../components/ActiveProjects'


const ProjectsScreen = () => {
  return (
    <>
    <View style={globalStyles.containerHCentered}>
      <Text style={globalStyles.textTitle}>Projects</Text>
    </View>

    <ActiveProjects />

    <TouchableOpacity onPress={() => test() }>
      <IconButtonHContent title="Add Project" icon="plus" bgcolor="#00000000" textcolor="steelblue"/> 
    </TouchableOpacity>
    </>
  )
  
}

const test = () => {
  console.log("test")
}

const styles = StyleSheet.create({})

export default ProjectsScreen