import createDataContext from './createDataContext'

const clientReducer = (state, action) => {
  switch (action.type) {
    case 'delete_client':
      return state.filter((clients) => clients.clientID !== action.payload)
    case 'add_client':
      let datestring = Date.now()
      return [...state, { 
        clientID: datestring,
        clientName: action.payload.clientName, 
        contactDate: action.payload.contactDate, 
        phone: action.payload.phone,
        email: action.payload.email, 
        address: action.payload.address, 
        unitNumber: action.payload.unitNumber, 
        city: action.payload.city, 
        usState: action.payload.usState, 
        zip: action.payload.zip, 
      }]
    case 'edit_client':
      return state.map((clients) => {
        return clients.clientID === action.payload.clientID ? action.payload : clients
      })
    default:
      return state
  }
}

const addClient = dispatch => {
  return (clientName, contactDate, phone, email, address, unitNumber, city, usState, zip ) => {
    dispatch({ 
      type: 'add_client', 
      payload: { clientName, contactDate, phone, email, address, unitNumber, city, usState, zip  } 
    })
  }
}

const editClient = dispatch => {
  return (clientID, clientName, contactDate, phone, email, address, unitNumber, city, usState, zip ) => {
    dispatch({ 
      type: 'edit_client', 
      payload: { clientID, clientName, contactDate, phone, email, address, unitNumber, city, usState, zip  } 
    })
  }
}

const deleteClient = dispatch => {
  return clientID => {
    dispatch({ type: 'delete_client', payload: clientID })
  }
}

export const { Context, Provider } = createDataContext(
  clientReducer, 
  { addClient, editClient, deleteClient },
  [{
    clientID: '000001',
    clientName: 'John Smith', 
    contactDate: '10/10/2023', 
    phone:'123-456-7890', 
    email:'test@gmail.com', 
    address: '6539 3rd Ave NW', 
    unitNumber:'', 
    city:'Seattle', 
    usState:'WA', 
    zip:'98117', 
  }]
)