import createDataContext from './createDataContext'

const projectReducer = (state, action) => {
  switch (action.type) {
    case 'add_project':
      return [...state, { id: `Project #${state.length + 1}`}]
    default:
      return state
  }
}

const addProject = dispatch => {
  return () => {
    dispatch({type: 'add_project'})
  }
}

export const { Context, Provider } = createDataContext(
  projectReducer, 
  {addProject},
  []
)