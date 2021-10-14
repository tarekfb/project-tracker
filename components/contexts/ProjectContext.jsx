import { useState, useEffect, createContext, useContext } from 'react';
import firebase from '../../firebase/FirebaseApp';
import 'firebase/firestore';

let ref = firebase.firestore().collection('/users/wPecInICm1CsUbDg8lmQ/projects/');
// const ref = firebase.firestore().collection('/users/');

async function checkIfProjectsCollectionExists() {
  // let snapshot = await ref.get();
  // console.log(snapshot.size());
}

async function getProjects() {
  checkIfProjectsCollectionExists();

  ref.get().then((project) => {
    const projectsList = project.docs.map((doc) => {
      let obj = doc.data();
      obj.id = doc.id;
      return obj;
    });
    return projectsList;
  });
}

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

export async function getUserIdFromEmail(email) {
  const ref = firebase.firestore().collection('/users/');
  let id;
  ref.get().then((user) => {
    user.docs.map((doc) => {
      if (doc.data().email == email) {
        id = doc.id;
      }
    });
  });
  return id;
}

//default values
const projectContextDefaultValue = getProjects();

//provider
const ProjectContext = createContext(projectContextDefaultValue);
import { useAuthState } from 'react-firebase-hooks/auth';

//hooks that components can use to change the values
export function ProjectContextProvider({ children }) {
  const [projects, setProjects] = useState();

  const auth = firebase.auth();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    async function setRef() {
      if (user) {
        let id = await getUserIdFromEmail(user.email);
        ref = firebase.firestore().collection(`/users/${id}/projects/`);
        let querySnapshot = await ref.get();
        console.log(querySnapshot.size);
      }
    }

    async function initProjects() {
      // get all projects from db, then assign id from db to each local project
      ref.get().then((project) => {
        const projectsList = project.docs.map((doc) => {
          let obj = doc.data();
          obj.id = doc.id;
          return obj;
        });
        setProjects(projectsList);
      });
    }

    initProjects();
    setRef();
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
