import React from 'react'
import CompanyForm from '../components/forms/CompanyForm'
import StackHeader from '../components/StackHeader'

const CompanyFormScreen = ({ route, navigation }) => {

  return (  
    <>
      <StackHeader title='Edit Company' navFunction={() => navigation.pop()}/>
      <CompanyForm navigation /> 
    </>     
  ) 
}

export default CompanyFormScreen