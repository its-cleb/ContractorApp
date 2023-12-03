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
    default:
      return state
  }
}

const addProject = dispatch => {
  return (clientName, contactDate, phone, email, address, unitNumber, city, usState, zip, description) => {
    dispatch({ type: 'add_project', payload: { clientName, contactDate, phone, email, address, unitNumber, city, usState, zip, description } })
  }
}

const deleteProject = dispatch => {
  return projectID => {
    dispatch({ type: 'delete_project', payload: projectID })
  }
}

export const { Context, Provider } = createDataContext(
  projectReducer, 
  { addProject, deleteProject },
  []
)