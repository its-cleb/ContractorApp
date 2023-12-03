import React from 'react'
import { View, StyleSheet } from 'react-native'
import IconButtonNavigate from '../components/IconButtonNavigate'
import DrawerHeader from '../components/DrawerHeader'

const HomeScreen = () => {

  return (
    <>
      <DrawerHeader title="Home" />

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