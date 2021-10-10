import { useState, useEffect, createContext, useContext } from 'react';
import firebase from '../../firebase/FirebaseApp';
import 'firebase/firestore';

const ref = firebase.firestore().collection('/users/olQnZcn5BJ4Oy7dagx4k/projects/');

async function getProjects() {
  const projectsRef = firebase.firestore().collection('/users/olQnZcn5BJ4Oy7dagx4k/projects');
  projectsRef.get().then((project) => {
    const projectsList = project.docs.map((doc) => {
      let obj = doc.data();
      obj.id = doc.id;
      return obj;
    });
    return projectsList;
  });
}

// export async function getProjectIdFromName(name) {
//   const projectsRef = firebase.firestore().collection('/users/olQnZcn5BJ4Oy7dagx4k/projects');
//   let id;
//   projectsRef.get().then((project) => {
//     const projectsList = project.docs.map((doc) => {
//       if (doc.data().name == name) {
//         id = doc.id;
//       }
//     });
//     return id;
//   });
// }

export async function getAllProjectIds() {
  const collection = await ref.get();
  const ids = [];
  collection.docs.map((doc) => {
    let idObj = {
      params: {
        id: doc.id,
      },
    };
    ids.push(idObj);
  });
  return ids;
}

//default values
const projectContextDefaultValue = getProjects();

//provider
const ProjectContext = createContext(projectContextDefaultValue);

//hooks that components can use to change the values
export function ProjectContextProvider({ children }) {
  const [projects, setProjects] = useState();

  useEffect(() => {
    async function initProjects() {
      // get all
      const projectsRef = firebase.firestore().collection('/users/olQnZcn5BJ4Oy7dagx4k/projects');
      projectsRef.get().then((project) => {
        const projectsList = project.docs.map((doc) => {
          let obj = doc.data();
          obj.id = doc.id;
          return obj;
        });
        setProjects(projectsList);
      });
    }

    initProjects();
  }, []);

  const setProjectsWrapper = async (projects, operation, project) => {
    // let promise = new Promise((resolve, reject) => {});
    let response;
    try {
      switch (operation) {
        case 'create':
          // add to dbs
          // attach id from db to proj
          // set updated state
          response = await ref.add(project);
          project.id = response.id;
          projects.push(project);
          setProjects(projects);
          break;
        case 'delete':
          // remove from db
          // set updated state
          response = await ref.doc(project.id).delete();
          setProjects(projects);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      response = error;
    }
    return response;
  };

  return <ProjectContext.Provider value={{ projects, setProjectsWrapper }}>{children}</ProjectContext.Provider>;
}

export function useProjectContext() {
  return useContext(ProjectContext);
}
