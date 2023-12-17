import React, { useContext } from 'react'
import { Context } from '../context/ClientContext'
import ClientForm from '../components/clients/ClientForm'

const EditClientScreen = ({ route, navigation }) => {
 
  const { state } = useContext(Context)

  const { payload } = route.params

  const clients = state.find(clients => clients.clientID === payload)

  // Destructrues clients from object to be usable by the child component
  const clientData = Object.entries(clients)

    return (  
      <ClientForm 
        initialValues={clientData} 
        navProp={navigation} 
        payloadProp={payload}
      />        
    ) 
  }

export default EditClientScreen