import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import IconButtonHContent from '../components/IconButtonHContent'
import IconButtonNavigate from '../components/IconButtonNavigate'
import ProjectFlatlist from '../components/ProjectsFlatlist'
import AddProjectScreen from './AddProjectScreen'
import { useNavigation } from '@react-navigation/native'

const ViewProjectsScreen = ({ navigation }) => {

  return (
    <>
      <View style={globalStyles.containerHCentered}>
        <Text style={globalStyles.textTitle}>View Projects</Text>
      </View>

      <ProjectFlatlist />

      <IconButtonHContent pressFunction={() => navigation.navigate('AddProject')} title="Add New Project" icon="plus" bgcolor="#00000000" textcolor="steelblue"/>
    
    </>
  ) 
  }

const styles = StyleSheet.create({

})

export default ViewProjectsScreen