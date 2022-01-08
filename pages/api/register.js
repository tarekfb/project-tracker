import { initAuth } from '@/firebase/FirebaseAuth';
import { db } from '@/firebase/FirebaseApp';

initAuth();

const addUserCollection = async (id, email) => {
  let snapShot = await db.collection('users').doc(id).get();

  if (!snapShot.exists) {
    console.log("user doesn't exists yet. adding!");
    let data = {
      email: email,
      apiKey: '',
    };
    let setDoc = await db.collection('users').doc(id).set(data);
    console.log(setDoc);
  }
};

const handler = async (req, res) => {
  try {
    let user = req.body;
    await addUserCollection(user.id, user.email);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.toString() });
  }
  return res.status(200).json({ success: true });
};

export default handler;
