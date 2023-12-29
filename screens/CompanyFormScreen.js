import React, { useContext } from 'react'
import { Context } from '../context/CompanyContext'
import CompanyForm from '../components/forms/CompanyForm'
import StackHeader from '../components/StackHeader'

const CompanyFormScreen = ({ route, navigation }) => {

  const { state } = useContext(Context)

  const isAdd = route.params.isAdd

  const companys = isAdd ? '' : state.find(companys => companys.companyID === route.params.payload)
  const companyData = isAdd ? '' : Object.entries(companys)

  return (  
    <>
      <StackHeader title={isAdd ? 'Add Company' : 'Edit Company'} navFunction={() => navigation.pop()}/>
      { isAdd ? 
        <CompanyForm nav={navigation} isAdd={isAdd} /> 
      :
        <CompanyForm 
          initialValues={companyData} 
          nav={navigation} 
          payload={route.params.payload}
          isAdd={isAdd} 
        /> 
      }  
    </>     
  ) 
}

export default CompanyFormScreen