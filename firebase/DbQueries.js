import { db } from '@/firebase/FirebaseApp';

export const getProject = async (userId, projectId) => {
  try {
    let projectsRef = db.collection(`users/${userId}/projects`);
    let project = await projectsRef.doc(projectId).get();
    return project.data();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getProjects = async (id) => {
  try {
    let projectsRef = db.collection(`users/${id}/projects`);
    let data = await projectsRef.get();
    let snapshot = data.docs;
    let projectsList = [];
    if (snapshot.length) {
      snapshot.map((doc) => {
        let obj = doc.data();
        obj.id = doc.id;
        projectsList.push(obj);
      });
    }
    return projectsList;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const addProject = async (userId, project) => {
  try {
    let projectsRef = db.collection(`users/${userId}/projects`);
    let response = await projectsRef.add(project);
    project.id = response.id;
    return project;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const removeProject = async (userId, projectId) => {
  try {
    let projectsRef = db.collection(`users/${userId}/projects`);
    return await projectsRef.doc(projectId).delete();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateContent = async (userId, projectId, project) => {
  try {
    let docRef = db.collection(`users/${userId}/projects`).doc(projectId);
    return await docRef.set(project);
  } catch (e) {
    console.error(e);
    return null;
  }
};

// const checkItemsNotNull = (items) => {
//   let bool = true;
//   items.forEach((item) => {
//     if (!item) {
//       bool = false;
//     }
//   });
//   return bool;
// };
