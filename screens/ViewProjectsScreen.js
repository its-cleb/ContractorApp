import React from 'react'
import { View, Text } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import IconButtonHContent from '../components/IconButtonHContent'
import ProjectFlatlist from '../components/ProjectsFlatlist'
import DrawerHeader from '../components/DrawerHeader'
import SearchBar from '../components/SearchBar'

const ViewProjectsScreen = ({ navigation }) => {

  return (
    <>
      <DrawerHeader title="Projects" />

      <SearchBar placeholderText="Search Projects" />

      <ProjectFlatlist />
      
      <IconButtonHContent pressFunction={() => navigation.navigate('AddProject')} title="Add New Project" icon="plus" bgcolor="#00000000" textcolor="steelblue"/>
    
    </>
  ) 
  }

export default ViewProjectsScreen