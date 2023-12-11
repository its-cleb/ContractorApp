import React, { useState } from 'react'
import { Keyboard, SafeAreaView, StyleSheet, View } from 'react-native'
import IconButtonHContent from '../components/IconButtonHContent'
import ProjectFlatlist from '../components/projects/ProjectsFlatlist'
import DrawerHeader from '../components/DrawerHeader'
import SearchBar from '../components/SearchBar'

const ViewProjectsScreen = ({ navigation }) => {

  const [searchTerm, setSearchTerm] = useState('')
  
  return (
    <SafeAreaView style={styles.pageContainer}>
      <DrawerHeader title="Projects" />

      <SearchBar 
        placeholderText="Search Projects" 
        searchTerm={searchTerm} 
        onTermChange={newSearchTerm => setSearchTerm(newSearchTerm)} 
        onTermSubmit={() => Keyboard.dismiss()} 
      />

      <ProjectFlatlist filterSearchTerm={searchTerm} />

      <View style={styles.addProjectButton}>
        <IconButtonHContent pressFunction={() => navigation.navigate('AddProject')} title="Add New Project" icon="plus" bgcolor="#00000000" textcolor="steelblue"/>
      </View>

    </SafeAreaView>
  ) 
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },
  addProjectButton: {
    backgroundColor: '#fafafa',
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    paddingBottom: 10,
  }
}) 

export default ViewProjectsScreen