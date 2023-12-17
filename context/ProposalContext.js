import createDataContext from './createDataContext'

const proposalReducer = (state, action) => {
  switch (action.type) {
    case 'delete_proposal':
      return state.filter((proposals) => proposals.proposalID !== action.payload)
    case 'add_proposal':
      return [...state, { 
        clientID: action.payload.clientID,
        projectID: action.payload.projectID,
        description: action.payload.description,
        proposal: action.payload.proposal
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
  return (clientID, proposalID, description, proposal) => {
    dispatch({ 
      type: 'add_proposal', 
      payload: { clientID, proposalID, description, proposal } 
    })
  }
}

const editProposal = dispatch => {
  return (clientID, proposalID, description, proposal) => {
    dispatch({ 
      type: 'edit_proposal', 
      payload: { clientID, proposalID, description, proposal } 
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
  []
)