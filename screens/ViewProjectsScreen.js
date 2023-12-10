import React, { useState } from 'react'
import IconButtonHContent from '../components/IconButtonHContent'
import ProjectFlatlist from '../components/projects/ProjectsFlatlist'
import DrawerHeader from '../components/DrawerHeader'
import SearchBar from '../components/SearchBar'

const ViewProjectsScreen = ({ navigation }) => {

  const [searchTerm, setSearchTerm] = useState('')
  
  return (
    <>
      <DrawerHeader title="Projects" />

      <SearchBar 
        placeholderText="Search Projects" 
        searchTerm={searchTerm} 
        onTermChange={newSearchTerm => setSearchTerm(newSearchTerm)} 
        onTermSubmit={() => console.log('test')} 
      />

      <ProjectFlatlist />
      
      <IconButtonHContent pressFunction={() => navigation.navigate('AddProject')} title="Add New Project" icon="plus" bgcolor="#00000000" textcolor="steelblue"/>
    
    </>
  ) 
  }

export default ViewProjectsScreen