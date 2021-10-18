import firebase, { auth } from '@/firebase/FirebaseApp';
import 'firebase/firestore';

export let projectsRef = auth.currentUser ? getRef(auth.currentUser.email) : null;
const usersRef = firebase.firestore().collection('/users/');

async function getRef(email) {
  let id = await getUserIdFromEmail(email);
  console.log(id);
  if (id) {
    let ref = firebase.firestore().collection(`/users/${id}/projects/`);
    return ref;
  }

  console.log(projectsRef);
}

async function getProjects() {
  console.log(projectsRef);
  if (projectsRef) {
    projectsRef.get().then((project) => {
      const projectsList = project.docs.map((doc) => {
        let obj = doc.data();
        obj.id = doc.id;
        return obj;
      });
      return projectsList;
    });
  }
  return null;
}

export async function getProject(id) {
  console.log('is projectsRef null?' + toString(projectsRef == null));
  return projectsRef ? await projectsRef.doc(id).get() : null;
}

async function GetProjectsCountForUser(userId) {
  const userDoc = await usersRef.collection(userId).get();
  let size = userDoc.size;
  return size;
}

/**
 * Gets the ids of all existing projects.
 * @returns A list of ids: string.
 */
export async function getAllProjectIds() {
  const ids = [];
  if (projectsRef) {
    console.log('inside getallproejctids');
    const snapshot = await projectsRef.get();
    snapshot.docs.map((projectsDoc) => {
      console.log('GETPROJECTSCOUTN WAS: ', GetProjectsCountForUser(projectsDoc.id));
      if (GetProjectsCountForUser(projectsDoc.id) > 0) {
        let idObj = {
          params: {
            id: doc.id,
          },
        };
        ids.push(idObj);
      }
    });
  }
  console.log('outside getallproejctids');

  return ids;
}

export async function getUserIdFromEmail(email) {
  const snapshot = await usersRef.get();

  let id;
  snapshot.docs.map((userDoc) => {
    if (userDoc.data().email == email) {
      id = userDoc.id;
    }
  });

  return id;
}
