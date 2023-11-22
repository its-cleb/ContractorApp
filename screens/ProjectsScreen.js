import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SimpleLineIcons, MaterialIcons, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalstyles'
import { useNavigation } from '@react-navigation/native'
import IconButtonBorderless from '../components/IconButtonBorderless'
import ActiveProjects from '../components/ActiveProjects'


const ProjectsScreen = () => {
  return (
    <>
    <View style={globalStyles.containerHCentered}>
      <Text style={globalStyles.textTitle}>Projects</Text>
    </View>

    <ActiveProjects />

    <IconButtonBorderless title="Add Project" icon="plus" bgcolor="#00000000" textcolor="steelblue"/> 
    </>
  )
}

const styles = StyleSheet.create({})

export default ProjectsScreen