import createDataContext from './createDataContext'

const companyReducer = (state, action) => {
  switch (action.type) {
    case 'edit':
      return [...state, { 
        companyName: action.payload.companyName, 
        phone: action.payload.phone,
        email: action.payload.email, 
        address: action.payload.address, 
        unitNumber: action.payload.unitNumber, 
        city: action.payload.city, 
        usState: action.payload.usState, 
        zip: action.payload.zip, 
      }]
    default:
      return state
  }
}

const editCompany = dispatch => {
  return ( companyName, phone, email, address, unitNumber, city, usState, zip ) => {
    dispatch({ 
      type: 'edit_company', 
      payload: { companyName, phone, email, address, unitNumber, city, usState, zip  } 
    })
  }
}

export const { Context, Provider } = createDataContext(
  companyReducer, 
  { editCompany },
  [{
    companyName: 'Stark Industries', 
    phone:'123-456-7890', 
    email:'test@gmail.com', 
    address: '1234 Admiral Way', 
    unitNumber:'1', 
    city:'Seattle', 
    usState:'WA', 
    zip:'98231' 
  }]
)