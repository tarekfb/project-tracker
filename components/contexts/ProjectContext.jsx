import { useState, useEffect, createContext, useContext } from 'react';

async function getProjects() {
  let data = ['test', 'house-scraper'];

  let projects = [];
  data.forEach((element) => {
    let project = {};
    project.name = element;
    project.startDate = new Date().toLocaleString('en-GB');
    projects.push(project);
  });
  return projects;
}

//default values
const projectContextDefaultValue = getProjects();

//provider
const ProjectContext = createContext(projectContextDefaultValue);

//hooks that components can use to change the values
export function ProjectContextProvider({ children }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function initProjects() {
      let req = await fetch('http://localhost:3000/projects.json');
      let data = await req.json();

      let projects = [];
      data.forEach((element) => {
        let project = {};
        project.name = element;
        project.startDate = new Date().toLocaleString('en-GB');
        projects.push(project);
      });
      setProjects(projects);
    }
    initProjects();
  }, []);

  const handleProjects = (projects) => {
    setProjects(projects);
  };

  return <ProjectContext.Provider value={{ projects, handleProjects }}>{children}</ProjectContext.Provider>;
}

export function useProjectContext() {
  return useContext(ProjectContext);
}
