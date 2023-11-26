import React, { useState } from 'react'

const ProjectContext = React.createContext()

export const ProjectProvider = ({ children }) => {

  const [projects, setProjects] = useState([])

  const addProjects = () => {
    setProjects([...projects, { 
      id: `Block Post #${projects.length + 1}`,
      
    }])
  }
  
  const projectList = [
    { id: '0001', 
      clientName: 'John Smith', 
      contactDate: '10/10/2023', 
      phone:'123-456-7890', email:'test@gmail.com', 
      address: '1234 Admiral Way', unit:'1', city:'Seattle', 
      state:'WA', 
      zip:'98231', 
      description: 'Install 2 planks on the forklift.'  
    }, 
  ]

  return <ProjectContext.Provider value={{ data: projects, addProjects}}>{children}</ProjectContext.Provider>
}

export default ProjectContext