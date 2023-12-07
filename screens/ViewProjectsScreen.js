import React from 'react'
import { View, Text } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import IconButtonHContent from '../components/IconButtonHContent'
import ProjectFlatlist from '../components/ProjectsFlatlist'
import DrawerHeader from '../components/DrawerHeader'

const ViewProjectsScreen = ({ navigation }) => {

  return (
    <>
      <DrawerHeader title="Projects" />

      <View style={globalStyles.containerHCentered}>
        <Text style={globalStyles.textTitle}>View Projects</Text>
      </View>

      <ProjectFlatlist />
      
      <IconButtonHContent pressFunction={() => navigation.navigate('AddProject')} title="Add New Project" icon="plus" bgcolor="#00000000" textcolor="steelblue"/>
    
    </>
  ) 
  }

export default ViewProjectsScreen