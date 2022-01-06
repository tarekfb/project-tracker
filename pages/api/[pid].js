import { initAuth } from '@/firebase/FirebaseAuth';
import { db } from '@/firebase/FirebaseApp';
import { getProjects } from '@/firebase/DbQueries';

initAuth();

const handleGetProjects = async (userId) => {
  console.log('inside handle get projects');
  let projects = await getProjects(userId);
  console.log(projects);
  return projects;
};

const handler = async (req, res) => {
  try {
    const { pid } = req.query;
    const projects = await handleGetProjects(pid);
    return res.status(200).json({ projects });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Unexpected error.' });
  }
  return res.status(200).json({ projects });
};

export default handler;
