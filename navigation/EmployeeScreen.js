import React from 'react'
import { View, StyleSheet } from 'react-native'
import DrawerHeader from '../components/DrawerHeader'
import EmployeesFlatlist from '../components/flatlists/EmployeeFlatlist'
import { IconButtonH } from '../components/Button'

const EmployeeScreen = ({ navigation }) => {

  return (
    <>
      <DrawerHeader title="Employees" />

      <EmployeesFlatlist />

      <View style={styles.addButton}>

        <IconButtonH
          pressFunction={() => navigation.navigate('EmployeeForm', {isAdd:true, payload: ''})} 
          title="Add New Employee" 
          icon="plus" 
          bgcolor="#00000000" 
          textcolor="steelblue"
          isBig
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },
  addButton: {
    backgroundColor: '#fafafa',
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    paddingBottom: 15,
  }
}) 

export default EmployeeScreen