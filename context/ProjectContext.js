import createDataContext from './createDataContext'

const projectReducer = (state, action) => {
  switch (action.type) {
    case 'delete_project':
      return state.filter((projects) => projects.projectID !== action.payload)
    case 'add_project':
      return [...state, { 
        projectID: action.payload.projectID,
        clientID: action.payload.clientID,
        proposalID: action.payload.clientID,
        title: action.payload.title,
        employees: action.payload.employees,
        tasks: action.payload.tasks,
        date: action.payload.date
      }]
    case 'edit_project':
      return state.map((projects) => {
        return projects.projectID === action.payload.projectID ? action.payload : projects
      })
    case 'remove_employee':
      state.map((projects) =>  {
        let filteredEmployees = projects.employees.filter(id => { return id != action.payload })
        return projects.employees = filteredEmployees
      })
      return state
    default:
      return state
  }
}

const addProject = dispatch => {
  return (projectID, clientID, proposalID, title, employees, tasks, date) => {
    dispatch({ 
      type: 'add_project', 
      payload: { projectID, clientID, proposalID, title, employees, tasks, date } 
    })
  }
}

const editProject = dispatch => {
  return (projectID, clientID, proposalID, title, employees, tasks, date) => {
    dispatch({ 
      type: 'edit_project', 
      payload: { projectID, clientID, proposalID, title, employees, tasks, date } 
    })
  }
}

const deleteProject = dispatch => {
  return projectID => {
    dispatch({ type: 'delete_project', payload: projectID })
  }
}

const removeEmployee = dispatch => {
  return employeeID => {
    dispatch({ type: 'remove_employee', payload: employeeID })
  }
}

export const { Context, Provider } = createDataContext(
  projectReducer, 
  { addProject, editProject, deleteProject, removeEmployee },
  [{
    projectID: '0001',
    clientID: '000001',
    proposalID: '',
    title: 'Kitchen Remodel',
    employees: ['00001', '00002'],
    tasks: ['Kitchen Sink', 'Tile Backsplash'],
    date: '01/29/2024'
  }]
)