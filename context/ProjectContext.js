import createDataContext from './createDataContext'

const projectReducer = (state, action) => {
  switch (action.type) {
    case 'delete_project':
      return state.filter((projects) => projects.id !== action.payload)
    case 'add_project':
      return [...state, { 
        id: `Project #${state.length + 1}`,
        clientName: 'John Smith', 
        contactDate: '10/10/2023', 
        phone:'123-456-7890', email:'test@gmail.com', 
        address: '1234 Admiral Way', unit:'1', city:'Seattle', 
        state:'WA', 
        zip:'98231', 
        description: 'Install 2 planks on the forklift.'  
      }]
    default:
      return state
  }
}

const addProject = dispatch => {
  return () => {
    dispatch({ type: 'add_project' })
  }
}

const deleteProject = dispatch => {
  return () => {
    dispatch({ type: 'delete_project', payload: id })
  }
}

export const { Context, Provider } = createDataContext(
  projectReducer, 
  { addProject, deleteProject },
  []
)