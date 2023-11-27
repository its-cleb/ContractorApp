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

      <Button
        title="Go to Root, Profile"
        onPress={() => navigation.navigate('HomeScreen')}
      />
      <IconButtonNavigate navpage="AddProjectScreen" title="Projects" icon="tools" bgcolor="steelblue" /> 

      {/* <IconButtonHContent pressFunction={() => navigation.navigate('AddProjectScreen')} title="Add New Project" icon="plus" bgcolor="#00000000" textcolor="steelblue"/> */}
    
    </>
  ) 
  }

const styles = StyleSheet.create({

})

export default ViewProjectsScreen