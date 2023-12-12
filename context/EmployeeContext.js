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
        name: action.payload.name, 
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
  return (name, phone, email, address, unitNumber, city, usState, zip, wage) => {
    dispatch({ 
      type: 'add_employee', 
      payload: { name, phone, email, address, unitNumber, city, usState, zip, wage } 
    })
  }
}

const editEmployee = dispatch => {
  return (employeeID, name, phone, email, address, unitNumber, city, usState, zip, wage) => {
    dispatch({ 
      type: 'edit_employee', 
      payload: { employeeID, name, phone, email, address, unitNumber, city, usState, zip, wage } 
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
    employeeID: 'Test employee',
    name: 'John Smith', 
    phone:'123-456-7890', 
    email:'test@gmail.com', 
    address: '1234 Admiral Way', 
    unitNumber:'1', 
    city:'Seattle', 
    usState:'WA', 
    zip:'98231', 
    wage: '25'
  }]
)