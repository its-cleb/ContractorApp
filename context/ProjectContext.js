import React from 'react'

const ProjectContext = React.createContext()

export const ProjectProvider = ({ children }) => {
  return <ProjectContext.Provider value={'context'}>
    {children}
  </ProjectContext.Provider>
}

export default ProjectContext