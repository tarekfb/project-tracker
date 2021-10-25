import firebase from 'firebase';

async function getProjects(id) {
  // console.log('get projects api');
  let projectsRef = firebase.firestore().collection(`users/${id}/projects`);
  projectsRef.get().then((project) => {
    const projectsList = project.docs.map((doc) => {
      let obj = doc.data();
      obj.id = doc.id;
      return obj;
    });
    // console.log('from getProjects inside of api call');
    // console.log(projectsList);
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
    let body = await getProjects(req.headers.authorization);
    // console.log(body);
    // console.log(JSON(body));
    res.JSON(body);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Unexpected error.' });
  }
  return res.status(200).json({ success: true });
};

export default handler;
