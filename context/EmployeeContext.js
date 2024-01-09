import createDataContext from './createDataContext'

const employeeReducer = (state, action) => {
  switch (action.type) {
    case 'delete_employee':
      return state.filter((employees) => employees.employeeID !== action.payload)
    case 'add_employee':
      let currenttime = new Date()
      let datestring = currenttime.toLocaleString();
      return [...state, { 
        employeeID: datestring,
        employeeName: action.payload.employeeName, 
        phone: action.payload.phone,
        email: action.payload.email, 
        address: action.payload.address, 
        unitNumber: action.payload.unitNumber, 
        city: action.payload.city, 
        usState: action.payload.usState, 
        zip: action.payload.zip, 
        wage: action.payload.wage
      }]
    case 'edit_employee':
      return state.map((employees) => {
        return employees.employeeID === action.payload.employeeID ? action.payload : employees
      })
    default:
      return state
  }
}

const addEmployee = dispatch => {
  return (employeeName, phone, email, address, unitNumber, city, usState, zip, wage) => {
    dispatch({ 
      type: 'add_employee', 
      payload: {employeeName, phone, email, address, unitNumber, city, usState, zip, wage } 
    })
  }
}

const editEmployee = dispatch => {
  return (employeeID, employeeName, phone, email, address, unitNumber, city, usState, zip, wage) => {
    dispatch({ 
      type: 'edit_employee', 
      payload: { employeeID, employeeName, phone, email, address, unitNumber, city, usState, zip, wage } 
    })
  }
}

const deleteEmployee = dispatch => {
  return employeeID => {
    dispatch({ type: 'delete_employee', payload: employeeID })
  }
}

export const { Context, Provider } = createDataContext(
  employeeReducer, 
  { addEmployee, editEmployee, deleteEmployee },
  [{
    employeeID: '00001',
    employeeName: 'Adam Ivelia', 
    phone:'123-456-0000', 
    email:'adam@gmail.com', 
    address: '6539 3rd Ave NW', 
    unitNumber:'1', 
    city:'Seattle', 
    usState:'WA', 
    zip:'98117', 
    wage: '30'
  },
  {
    employeeID: '00002',
    employeeName: 'Brandon Johnson', 
    phone:'987-654-3210', 
    email:'brandon@gmail.com', 
    address: '18601 57th Pl W', 
    unitNumber:'1', 
    city:'Lynwood', 
    usState:'WA', 
    zip:'98037', 
    wage: '25'
  },
  {
    employeeID: '00003',
    employeeName: 'Carson Shithead', 
    phone:'123-456-1111', 
    email:'carson@gmail.com', 
    address: '1234 Chuckanut Blvd', 
    unitNumber:'2', 
    city:'Bend', 
    usState:'OR', 
    zip:'98231', 
    wage: '5'
  }]
)