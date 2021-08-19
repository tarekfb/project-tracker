import { useState, useEffect, createContext } from 'react';

function getProjects() {
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
export const projectContextDefaultValue = getProjects();

//provider
export const ProjectContext = createContext(projectContextDefaultValue);

//hooks that components can use to change the values
export function useProjectContextValue() {
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
    console.log('handle wascalle');
    setProjects(projects);
  };

  return {
    projects,
    setProjects,
    handleProjects,
  };
}

// const projects = getProjects();

// export const ProjectContext = createContext(projects);

// export function AppWrapper({ children }) {
//   const [projects, setProjects] = useState([]);

//   return (
//     <ProjectContext.Provider value={{ projects, setProjects }}>
//       {children}
//     </ProjectContext.Provider>
//   );
// }

// export function useProjectContext() {
//   return useContext(ProjectContext);
// }
