import React from 'react'
import { View, StyleSheet } from 'react-native'
import DrawerHeader from '../components/DrawerHeader'
import EmployeesFlatlist from '../components/flatlists/EmployeeFlatlist'
import IconButtonHContent from '../components/IconButtonHContent'

const EmployeeScreen = ({ navigation }) => {

  return (
    <>
      <DrawerHeader title="Employees" />

      <EmployeesFlatlist />

      <View style={styles.addEmployeeButton}>
        <IconButtonHContent pressFunction={() => navigation.navigate('EmployeeForm', {isAdd:true, payload: ''})} title="Add New Employee" icon="plus" bgcolor="#00000000" textcolor="steelblue"/>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },
  addEmployeeButton: {
    backgroundColor: '#fafafa',
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    paddingBottom: 10,
  }
}) 

export default EmployeeScreen