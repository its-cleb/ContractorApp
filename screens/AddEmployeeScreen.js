import React from 'react'
import EmployeeForm from '../components/employees/EmployeeForm'

const AddEmployeeScreen = ({ navigation }) => {

    return (  
      <EmployeeForm navProp={navigation} />
    ) 
  }

export default AddEmployeeScreen