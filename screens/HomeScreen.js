import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ActiveProjects from '../components/ActiveProjects'
import IconButtonNavigate from '../components/IconButtonNavigate'
import ProjectContext from '../context/ProjectContext'

const HomeScreen = () => {
  const Test = useContext(ProjectContext)
  return (
    <>
      <View>
        <ActiveProjects />
      </View>

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

     <View>
      <Text>{Test}</Text>
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