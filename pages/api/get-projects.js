import { initAuth } from '@/firebase/FirebaseAuth';
import { db } from '@/firebase/FirebaseApp';

initAuth();

const getProject = async (id) => {
  //   let snapShot = await db.collection('users').doc(id).get();
  //   if (!snapShot.exists) {
  //     console.log("user doesn't exists yet. adding!");
  //     let data = {
  //       email: email,
  //     };
  //     let setDoc = await db.collection('users').doc(id).set(data);
  //     console.log(setDoc);
  //   }
};

const getProjects = async (id) => {};

const verify = async (verificationId) => {
    // get token 
  return true;
};

const handler = async (req, res) => {
  try {
    let data = req.body;

    const verified = verify(data.verificationId);
    if (verified) {
    }
    const projects = await getProjects(data.id, data.email);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Unexpected error.' });
  }
  return res.status(200).json({ success: true });
};

export default handler;
