import { db } from '@/firebase/FirebaseApp';

async function getProject(userid, projectId) {
  console.log('get projects api');
  let projectsRef = db.collection(`users/${userId}/projects`);
  let data = await projectsRef.get();
  let thing = await projectsRef.doc(projectId).get();

  return projectsList;
}

const handler = async (req, res) => {
  try {
    // if req.authorization is null, there is no auth'd user.
    // if not null, it will equal the id of user doc
    let userIid = req.headers.authorization;
    let projects = await getProject(userid, projectId);
    return res.status(200).json(JSON.stringify(projects));
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Unexpected error.' });
  }
};

export default handler;
