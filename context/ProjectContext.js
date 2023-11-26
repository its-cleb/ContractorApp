import React, { useState } from 'react'

const ProjectContext = React.createContext()

export const ProjectProvider = ({ children }) => {

  const projectList = [
    { projectName: 'Project 1', id: '0001' },
    { projectName: 'Project 2', id: '0002'}
  ]
  const [projects, setProjects] = useState(['test'])

  return <ProjectContext.Provider value={projectList}>
    {children}
  </ProjectContext.Provider>
}

export default ProjectContext