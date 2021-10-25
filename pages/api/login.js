import { setAuthCookies } from 'next-firebase-auth';
import { initAuth } from '@/firebase/initDb';
import firebase from 'firebase';

initAuth();

const addUserCollection = async (email) => {
  const ref = firebase.firestore().collection('/users/');
  let userObj = {
    email: email,
  };
  let response = await ref.add(userObj);
  return response;
};

const handler = async (req, res) => {
  try {
    console.log(JSON.stringify(req.headers));
    console.log(req.body);
    addUserCollection(req.body);
    await setAuthCookies(req, res);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Unexpected error.' });
  }
  return res.status(200).json({ success: true });
};

export default handler;
