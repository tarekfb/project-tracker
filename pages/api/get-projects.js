import { db } from '@/firebase/FirebaseApp';

async function getProjects(id) {
  console.log('get projects api');
  let projectsRef = db.collection(`users/${id}/projects`);
  let data = await projectsRef.get();
  let snapshot = data.docs;
  let size = snapshot.length;
  let projectsList = [];
  if (size) {
    snapshot.map((doc) => {
      let obj = doc.data();
      obj.id = doc.id;
      projectsList.push(obj);
    });
  }
  return projectsList;
}

const handler = async (req, res) => {
  try {
    // if req.authorization is null, there is no auth'd user.
    // if not null, it will equal the id of user doc
    let id = req.headers.authorization;
    let projects = await getProjects(id);
    return res.status(200).json(JSON.stringify(projects));
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Unexpected error.' });
  }
};

export default handler;
