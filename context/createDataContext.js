import React, { useReducer } from 'react'

// Functional Component for simplifying new Context creation

export default (reducer, actions, initialState) => {
  const Context = React.createContext()

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // Link for giving new Contexts access to dispatch actions
    const boundActions = {}
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch)
    }

    return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>
  }

  return { Context, Provider }
}