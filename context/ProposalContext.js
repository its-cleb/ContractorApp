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
        clientID: action.payload.clientName, 
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
  return (proposalID, clientID) => {
    dispatch({ 
      type: 'add_proposal', 
      payload: { proposalID, clientID } 
    })
  }
}

const editProposal = dispatch => {
  return (proposalID, clientID ) => {
    dispatch({ 
      type: 'edit_proposal', 
      payload: { proposalID, clientID } 
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
    clientID: 'John Smith', 
  }]
)