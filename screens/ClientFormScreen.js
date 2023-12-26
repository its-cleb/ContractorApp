import React, { useContext } from 'react'
import { Context } from '../context/ClientContext'
import ClientForm from '../components/forms/ClientForm'
import StackHeader from '../components/StackHeader'

const ClientFormScreen = ({ route, navigation }) => {

  const { state } = useContext(Context)

  const isAdd = route.params.isAdd

  const clients = isAdd ? '' : state.find(clients => clients.clientID === route.params.payload)
  const clientData = isAdd ? '' : Object.entries(clients)

  return (  
    <>
      <StackHeader title={isAdd ? 'Add Client' : 'Edit Client'}/>
      { isAdd ? 
        <ClientForm nav={navigation} isAdd={isAdd} /> 
      :
        <ClientForm 
          initialValues={clientData} 
          nav={navigation} 
          payload={route.params.payload}
          isAdd={isAdd} 
        /> 
      }  
    </>     
  ) 
}

export default ClientFormScreen