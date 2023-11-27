import React from 'react'
import { View, Text, StatusBar, StyleSheet } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import IconButtonHContent from '../components/IconButtonHContent'
import ProjectFlatlist from '../components/ProjectsFlatlist'

const ViewProjectsScreen = ({ navigation }) => {

  return (
    <>
    <StatusBar />
      <View style={globalStyles.containerHCentered}>
        <Text style={globalStyles.textTitle}>View Projects</Text>
      </View>

      <ProjectFlatlist />
      <IconButtonHContent pressFunction={() => navigation.openDrawer()} title="Add New Project" icon="plus" bgcolor="#00000000" textcolor="steelblue"/>
      <IconButtonHContent pressFunction={() => navigation.navigate('AddProject')} title="Add New Project" icon="plus" bgcolor="#00000000" textcolor="steelblue"/>
    
    </>
  ) 
  }

const styles = StyleSheet.create({

})

export default ViewProjectsScreen