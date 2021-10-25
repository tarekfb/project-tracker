// import { useState, useEffect, createContext, useContext } from 'react';
// import firebase, { auth } from '@/firebase/FirebaseApp';
// import 'firebase/firestore';
// import { useAuthState } from 'react-firebase-hooks/auth';

// let projectsRef;

// const usersRef = firebase.firestore().collection('/users/');

// async function getProjects() {
//   console.log(projectsRef);
//   if (projectsRef) {
//     projectsRef.get().then((project) => {
//       const projectsList = project.docs.map((doc) => {
//         let obj = doc.data();
//         obj.id = doc.id;
//         return obj;
//       });
//       return projectsList;
//     });
//   }
//   return null;
// }

// export async function getProject(id) {
//   console.log('ref from getproject', projectsRef);
//   return projectsRef ? await projectsRef.doc(id).get() : null;
// }

// async function GetProjectsCountForUser(userId) {
//   const userDoc = await usersRef.collection(userId).get();
//   let size = userDoc.size;
//   return size;
// }

// /**
//  * Gets the ids of all existing projects.
//  * @returns A list of ids: string.
//  */
// export async function getAllProjectIds() {
//   const ids = [];
//   console.log('ref from getallprojectids', projectsRef);

//   if (projectsRef) {
//     console.log('inside getallproejctids');
//     const snapshot = await projectsRef.get();
//     snapshot.docs.map((projectsDoc) => {
//       console.log('GETPROJECTSCOUTN WAS: ', GetProjectsCountForUser(projectsDoc.id));
//       if (GetProjectsCountForUser(projectsDoc.id) > 0) {
//         let idObj = {
//           params: {
//             id: doc.id,
//           },
//         };
//         ids.push(idObj);
//       }
//     });
//   }
//   console.log('outside getallproejctids');

//   return ids;
// }

// export async function getUserIdFromEmail(email) {
//   const snapshot = await usersRef.get();

//   let id;
//   snapshot.docs.map((userDoc) => {
//     if (userDoc.data().email == email) {
//       id = userDoc.id;
//     }
//   });

//   return id;
// }

// //default values
// const projectContextDefaultValue = []; // previously getProjects(). Unable to use, because at this point user is undefined

// //provider
// const ProjectContext = createContext(projectContextDefaultValue);

// //hooks that components can use to change the values
// export function ProjectContextProvider({ children }) {
//   const [projects, setProjects] = useState([]);
//   const [user] = useAuthState(auth);

//   useEffect(() => {
//     async function initValues() {
//       async function setRef() {
//         if (user) {
//           let id = await getUserIdFromEmail(user.email);
//           if (id) {
//             projectsRef = firebase.firestore().collection(`/users/${id}/projects/`);
//           }
//         }
//       }

//       async function initProjects() {
//         const projects = await getProjects();
//         setProjects(projects);
//       }

//       await setRef();
//       await initProjects();
//     }
//     initValues();
//   }, [user]);

//   useEffect(() => {
//     console.log('projectsref was changed');
//     console.log(projectsRef);
//   }, [projectsRef]);

//   const setProjectsWrapper = async (projects, operation, project) => {
//     let response;
//     try {
//       switch (operation) {
//         case 'create':
//           // add to dbs
//           // attach id from db to proj
//           // set updated state
//           response = await projectsRef.add(project);
//           project.id = response.id;
//           projects.push(project);
//           setProjects(projects);
//           break;
//         case 'delete':
//           // remove from db
//           // set updated state
//           response = await projectsRef.doc(project.id).delete();
//           setProjects(projects);
//           break;
//         default:
//           break;
//       }
//     } catch (error) {
//       console.log(error);
//       response = error;
//     }
//     return response;
//   };

//   const logRef = () => {
//     console.log(projectsRef);
//     return projectsRef;
//   };

//   return <ProjectContext.Provider value={{ projects, setProjectsWrapper, logRef }}>{children}</ProjectContext.Provider>;
// }

// export function useProjectContext() {
//   return useContext(ProjectContext);
// }
