import { db, auth } from '@/firebase/FirebaseApp';

async function getProjects(id) {
  console.log('get projects api');
  let projectsRef = db.collection(`users/${id}/projects`);
  projectsRef.get().then((project) => {
    let projectsList = [];
    project.docs.map((doc) => {
      let obj = doc.data();
      obj.id = doc.id;
      projectsList.push(obj);
    });
    console.log('from getProjects inside of api call');
    console.log(projectsList);
    return projectsList;
    // rewrite to use async/await keywords
  });
}

const handler = async (req, res) => {
  try {
    // if req.authorization is null, there is no auth'd user.
    // if not null, it will equal the id of user doc
    console.log('from handler getprojects');
    let id = req.headers.authorization;
    console.log(id);
    let projects = await getProjects(req.headers.authorization);
    console.log('proejcts were');
    console.log(projects);
    return res.status(200).json(JSON.stringify(projects));
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Unexpected error.' });
  }
};

export default handler;
