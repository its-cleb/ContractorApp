import createDataContext from './createDataContext'

const estimateReducer = (state, action) => {
  switch (action.type) {
    case 'delete_estimate':
      return state.filter((estimates) => estimates.estimateID !== action.payload)
    case 'add_estimate':
      let currenttime = new Date()
      let datestring = currenttime.toLocaleString();
      return [...state, { 
        estimateID: datestring,
        projectID: action.payload.clientName, 
      }]
    case 'edit_estimate':
      return state.map((estimates) => {
        return estimates.estimateID === action.payload.estimateID ? action.payload : estimates
      })
    default:
      return state
  }
}

const addEstimate = dispatch => {
  return (estimateID, projectID) => {
    dispatch({ 
      type: 'add_estimate', 
      payload: { estimateID, projectID } 
    })
  }
}

const editEstimate = dispatch => {
  return (estimateID, projectID ) => {
    dispatch({ 
      type: 'edit_estimate', 
      payload: { estimateID, projectID } 
    })
  }
}

const deleteEstimate = dispatch => {
  return estimateID => {
    dispatch({ type: 'delete_estimate', payload: estimateID })
  }
}

export const { Context, Provider } = createDataContext(
  estimateReducer, 
  { addEstimate, editEstimate, deleteEstimate },
  [{
    estimateID: 'Test Estimate',
    projectID: 'John Smith', 
  }]
)