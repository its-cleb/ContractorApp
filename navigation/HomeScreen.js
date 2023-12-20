import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import IconButtonNavigate from '../components/IconButtonNavigate'
import DrawerHeader from '../components/DrawerHeader'
import ProjectsFlatlist from '../components/projects/ProjectsFlatlist'
import { globalStyles } from '../styles/globalstyles'

const HomeScreen = () => {

  return (
    <>
      <DrawerHeader title="Home" />
      
      <View style={globalStyles.containerHCentered}>
        <Text style={globalStyles.textTitle}>Upcoming Projects</Text>
      </View>
      <View style={styles.projectsContainer}> 
        <ProjectsFlatlist isFiltered={false} />
      </View>

      <View style={styles.flexBox}>
        <View style={styles.flexItem}>
          <IconButtonNavigate navpage="Estimator" title="Estimator" icon="calculator" bgcolor="firebrick" /> 
        </View>
        <View style={styles.flexItem}>
          <IconButtonNavigate navpage="Clients" title="Clients" icon="tools" bgcolor="steelblue" /> 
        </View>
        <View style={styles.flexItem}>
         <IconButtonNavigate navpage="Employees" title="Employees" icon="users" bgcolor="chocolate" /> 
        </View>
     </View>
    </>
  )
}

const styles = StyleSheet.create({
  projectsContainer: {
    paddingHorizontal: 5
  },
  flexBox: {
    flexDirection: 'row',
    padding: 5,
  },
  flexItem: {
    flex: 1
  }
})

export default HomeScreen