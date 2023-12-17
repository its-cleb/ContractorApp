import React from 'react'
import ClientForm from '../components/clients/ClientForm'

const AddClientScreen = ({ navigation }) => {

    return (  
      <ClientForm navProp={navigation} />        
    ) 
  }

export default AddClientScreen