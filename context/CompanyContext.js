import createDataContext from './createDataContext'

const companyReducer = (state, action) => {
  switch (action.type) {
    case 'edit_company':
      return state.map(() => {
        return action.payload})
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
    email:'starkindustries@gmail.com', 
    address: '1234 Avengers Tower', 
    unitNumber:'1', 
    city:'Manhattan', 
    usState:'NY', 
    zip:'28548' 
  }]
)