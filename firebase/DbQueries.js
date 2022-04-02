import { db } from '@/firebase/FirebaseApp';
// import generateApiKey from 'generate-api-key';
import Cryptr from 'cryptr';

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
    // if (true) {
    snapshot.map((doc) => {
      let obj = doc.data();
      obj.id = doc.id;
      projectsList.push(obj);
    });
    // }
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

/**
 * Generates api key in db and returns new key or null if unsuccessful.
 * @param {*} userId
 * @param {*} project
 */
export const createApiKey = async (userId) => {
  try {
    // create ref
    let docRef = db.collection(`users`).doc(userId);

    // check if has apikey
    let docRefGet = await docRef.get();
    let data = docRefGet.data();
    if (!data.apiKey) {
      // create key
      const cryptr = new Cryptr('asd'); // use key from env: CRYPTR_SECRET
      const encryptedKey = cryptr.encrypt(userId);
      console.log(encryptedKey);
      let key = {
        apiKey: encryptedKey,
      };

      // set key in db
      return await docRef.set(key);
    } else {
      return null; // TODO: provide better error handling with details
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getApiKey = async (userId) => {
  try {
    // create ref
    let docRef = db.collection(`users`).doc(userId);

    // check if has apikey
    // if has, decrypt and return key
    // if not, return empty
    let docRefGet = await docRef.get();
    let data = docRefGet.data();
    if (!data.apiKey) {
      return '';
    } else {
      return data.apiKey;
    }
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
