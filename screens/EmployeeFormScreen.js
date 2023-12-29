import React, { useContext } from 'react'
import { Context } from '../context/EmployeeContext'
import EmployeeForm from '../components/forms/EmployeeForm'
import StackHeader from '../components/StackHeader'

const EmployeeFormScreen = ({ route, navigation }) => {

  const { state } = useContext(Context)

  const isAdd = route.params.isAdd

  const employees = isAdd ? '' : state.find(employees => employees.employeeID === route.params.payload)
  const employeeData = isAdd ? '' : Object.entries(employees)

  return (  
    <>
      <StackHeader title={isAdd ? 'Add Employee' : 'Edit Employee'} navFunction={() => navigation.pop()}/>

      { isAdd ?
      <EmployeeForm navProp={navigation} />
      :
      <EmployeeForm
        initialValues={employeeData} 
        navProp={navigation} 
        payloadProp={route.params.payload}
      />
      }
    </>
  ) 
}

export default EmployeeFormScreen