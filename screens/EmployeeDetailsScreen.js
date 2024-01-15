import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Context } from '../context/EmployeeContext'
import { Context as ProjectContext } from '../context/ProjectContext'
import DeleteButton from '../components/DeleteButton'
import { IconButtonH } from '../components/Button'

const EmployeeDetailsScreen = ({ route, navigation }) => {

  const { state, deleteEmployee } = useContext(Context)

  const { payload } = route.params
  
  const employees = state.find(employees => employees.employeeID === payload)

  // Get Project references
  const projects = useContext(ProjectContext)

  const deleteEmployeeNavBack = () => {
    projects.removeEmployee(payload)
    deleteEmployee(payload)
    navigation.pop()
  }
  
  return (  
    <>
      <View style={styles.employeeContainer}>
        <View style={styles.employeeHeader}>
          <Text style={styles.employeeTextHeader}>{employees.employeeName}</Text>
          <DeleteButton pressFunction={deleteEmployeeNavBack}/>
        </View>
        <View style={styles.employeeRow}>
          <Text style={[styles.employeeTextBold, styles.flexOne]}>Hourly Wage:</Text>
          <Text style={styles.employeeTextRight}>${employees.wage}</Text>
        </View>
        <View style={styles.employeeRow}>
          <Text style={[styles.employeeTextBold, styles.flexOne]}>Phone:</Text>
          <Text style={styles.employeeTextRight}>{employees.phone}</Text>
        </View>
        <View style={styles.employeeRow}>
          <Text style={[styles.employeeTextBold, styles.flexOne]}>Email:</Text>
          <Text style={styles.employeeTextRight}>{employees.email}</Text>
        </View>
        <View style={styles.employeeRow}>
          <Text style={[styles.employeeTextBold]}>Address:</Text>
          <View style={styles.flexOne}>
            <Text style={styles.employeeTextRight}>{employees.address}, {employees.unitNumber}</Text>
            <Text style={styles.employeeTextRight}>{employees.city}, {employees.usState} {employees.zip}</Text>
          </View>  
        </View>
      </View>
      
      <IconButtonH 
        pressFunction={() => navigation.navigate('EmployeeForm', {isAdd:false, payload: payload})} 
        title='Edit Employee' 
        icon='edit' 
        textcolor='white'
        bgcolor='steelblue' 
        marginH={10}
      />
      
    </>
  ) 
}

const styles = StyleSheet.create({
  employeeContainer: {
    borderRadius: 5,
    margin: 10,
    paddingBottom: 8,
  },
  employeeHeader: {
    flexDirection: 'row',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#666666',
    paddingBottom: 3,
    paddingTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  employeeRow: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 5,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderRadius: 5,
    borderWidth: 1,
  },
  employeeText: {
    color: 'black',
    fontSize: 16,
  },
  employeeTextHeader: {
    fontWeight: 'bold', 
    fontSize: 24,
    flex: 1
  },
  employeeTextBold: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  employeeTextRight: {
    color: 'black',
    textAlign: 'right',
    fontSize: 16,
  },
  flexOne: {
    flex: 1,
  },
})

export default EmployeeDetailsScreen