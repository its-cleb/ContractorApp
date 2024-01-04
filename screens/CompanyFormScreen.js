import React from 'react'
import CompanyForm from '../components/forms/CompanyForm'
import StackHeader from '../components/StackHeader'

const CompanyFormScreen = ({ navigation }) => {

  return (  
    <>
      <StackHeader title='Edit Company' navFunction={() => navigation.pop()}/>
      <CompanyForm nav={navigation} /> 
    </>     
  ) 
}

export default CompanyFormScreen