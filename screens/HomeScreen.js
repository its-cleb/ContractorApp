import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import IconButtonNavigate from '../components/IconButtonNavigate'
import ProjectFlatlist from '../contentcomponents/ProjectsFlatlist'
import { globalStyles } from '../styles/globalstyles'

const HomeScreen = () => {

  return (
    <>
      <View style={globalStyles.containerHCentered}>
        <Text style={globalStyles.textTitle}>Active Projects</Text>
      </View>

      <ProjectFlatlist />

      <View style={styles.flexBox}>
        <View style={styles.flexItem}>
          <IconButtonNavigate navpage="Estimator" title="Estimator" icon="calculator" bgcolor="firebrick" /> 
        </View>
        <View style={styles.flexItem}>
          <IconButtonNavigate navpage="Projects" title="Projects" icon="tools" bgcolor="steelblue" /> 
        </View>
        <View style={styles.flexItem}>
         <IconButtonNavigate navpage="Company" title="Company" icon="users" bgcolor="chocolate" /> 
        </View>
     </View>
    </>
  )
}

const styles = StyleSheet.create({
  flexBox: {
    flexDirection: 'row',
    padding: 5,
  },
  flexItem: {
    flex: 1
  }
})

export default HomeScreen