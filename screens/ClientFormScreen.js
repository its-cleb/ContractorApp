import React, { useContext } from 'react'
import { Context } from '../context/ClientContext'
import ClientForm from '../components/clients/ClientForm'
import StackHeader from '../components/StackHeader'

const ClientFormScreen = ({ route, navigation }) => {

  const { state } = useContext(Context)

  const isAdd = route.params.isAdd

  const clients = isAdd ? '' : state.find(clients => clients.clientID === route.params.payload)
  const clientData = isAdd ? '' : Object.entries(clients)

    return (  
    <>
      <StackHeader title={isAdd ? 'Add Client' : 'Edit Client'}/>
      {isAdd ? 
      <ClientForm navProp={navigation} /> 
      :
      <ClientForm 
        initialValues={clientData} 
        navProp={navigation} 
        payloadProp={route.params.payload}
      /> 
      }  
    </>     
    ) 
  }

export default ClientFormScreen