import createDataContext from './createDataContext'

const proposalReducer = (state, action) => {
  switch (action.type) {
    case 'delete_proposal':
      return state.filter((proposals) => proposals.proposalID !== action.payload)
    case 'add_proposal':
      let currenttime = new Date()
      let datestring = currenttime.toLocaleString();
      return [...state, { 
        proposalID: datestring,
        projectID: action.payload.clientName, 
      }]
    case 'edit_proposal':
      return state.map((proposals) => {
        return proposals.proposalID === action.payload.proposalID ? action.payload : proposals
      })
    default:
      return state
  }
}

const addProposal = dispatch => {
  return (proposalID, projectID) => {
    dispatch({ 
      type: 'add_proposal', 
      payload: { proposalID, projectID } 
    })
  }
}

const editProposal = dispatch => {
  return (proposalID, projectID ) => {
    dispatch({ 
      type: 'edit_proposal', 
      payload: { proposalID, projectID } 
    })
  }
}

const deleteProposal = dispatch => {
  return proposalID => {
    dispatch({ type: 'delete_proposal', payload: proposalID })
  }
}

export const { Context, Provider } = createDataContext(
  proposalReducer, 
  { addProposal, editProposal, deleteProposal },
  [{
    proposalID: 'Test Proposal',
    projectID: 'John Smith', 
  }]
)