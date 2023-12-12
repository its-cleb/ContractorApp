import React, { useContext } from 'react'
import { Context } from '../context/EmployeeContext'
import EmployeeForm from '../components/employees/EmployeeForm'

const EditEmployeeScreen = ({ route, navigation }) => {

  const { state } = useContext(Context)

  const { payload } = route.params

  const employees = state.find(employees => employees.employeeID === payload)

  // Destructrues employees from object to be usable by the child component
  const employeeData = Object.entries(employees)

    return (  
      <EmployeeForm
        initialValues={employeeData} 
        navProp={navigation} 
        payloadProp={payload}
      />
    ) 
  }

export default EditEmployeeScreen