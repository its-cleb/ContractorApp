import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { globalStyles } from '../styles/globalstyles'
import DrawerHeader from '../components/DrawerHeader'
import EmployeesFlatlist from '../components/employees/EmployeesFlatlist'
import IconButtonHContent from '../components/IconButtonHContent'

const EmployeeScreen = ({ navigation }) => {

  return (
    <>
      <DrawerHeader title="Employees" />

      <EmployeesFlatlist />

      <View style={styles.addProjectButton}>
        <IconButtonHContent pressFunction={() => navigation.navigate('AddEmployee')} title="Add New Employee" icon="plus" bgcolor="#00000000" textcolor="steelblue"/>
      </View>
    </>
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

export default EmployeeScreen