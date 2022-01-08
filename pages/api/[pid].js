import { initAuth } from '@/firebase/FirebaseAuth';
import { getProjects } from '@/firebase/DbQueries';
import Cryptr from 'cryptr';

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
    const cryptr = new Cryptr('asd'); // use key from env: CRYPTR_SECRET
    const decryptedKey = cryptr.decrypt(pid);
    console.log(pid);
    console.log(decryptedKey);
    const projects = await handleGetProjects(decryptedKey);
    return res.status(200).json({ projects });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.toString() });
  }
};

export default handler;
