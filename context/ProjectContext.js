import createDataContext from './createDataContext'

const projectReducer = (state, action) => {
  switch (action.type) {
    case 'delete_project':
      return state.filter((projects) => projects.projectID !== action.payload)
    case 'add_project':
      let currenttime = new Date()
      let datestring = currenttime.toLocaleString();
      return [...state, { 
        projectID: datestring,
        clientName: action.payload.clientName, 
        contactDate: action.payload.contactDate, 
        phone: action.payload.phone,
        email: action.payload.email, 
        address: action.payload.address, 
        unitNumber: action.payload.unitNumber, 
        city: action.payload.city, 
        usState: action.payload.usState, 
        zip: action.payload.zip, 
        description: action.payload.description
      }]
    case 'edit_project':
      return state.map((projects) => {
        return projects.projectID === action.payload.projectID ? action.payload : projects
      })
    default:
      return state
  }
}

const addProject = dispatch => {
  return (clientName, contactDate, phone, email, address, unitNumber, city, usState, zip, description) => {
    dispatch({ 
      type: 'add_project', 
      payload: { clientName, contactDate, phone, email, address, unitNumber, city, usState, zip, description } 
    })
  }
}

const editProject = dispatch => {
  return (projectID, clientName, contactDate, phone, email, address, unitNumber, city, usState, zip, description) => {
    dispatch({ 
      type: 'edit_project', 
      payload: { projectID, clientName, contactDate, phone, email, address, unitNumber, city, usState, zip, description } 
    })
  }
}

const deleteProject = dispatch => {
  return projectID => {
    dispatch({ type: 'delete_project', payload: projectID })
  }
}

export const { Context, Provider } = createDataContext(
  projectReducer, 
  { addProject, editProject, deleteProject },
  [{
    projectID: 'Test Project',
    clientName: 'John Smith', 
    contactDate: '10/10/2023', 
    phone:'123-456-7890', 
    email:'test@gmail.com', 
    address: '1234 Admiral Way', 
    unitNumber:'1', 
    city:'Seattle', 
    usState:'WA', 
    zip:'98231', 
    description: 'Install 2 planks on the forklift.'
  }]
)