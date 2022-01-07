import { setAuthCookies } from 'next-firebase-auth';
import { initAuth } from '@/firebase/FirebaseAuth';

initAuth();

// const db = firebase.firestore();

// const addUserCollection = async (id, email) => {
//   let snapShot = await db.collection('users').doc(id).get();

//   if (!snapShot.exists) {
//     console.log("user doesn't exists yet. adding!");
//     await setDoc(doc(db, 'users', uid), {
//       email: email,
//     });
//   }
// };

const handler = async (req, res) => {
  try {
    // console.log(JSON.stringify(req.headers.authorization));
    await setAuthCookies(req, res);
    // const auth = getAuth();
    // const user = auth.currentUser;
    // console.log('before usercheck');
    // console.log(user);
    // if (user) {
    //   console.log('reached currentuser check');

    //   let id = user.uid;
    //   let email = user.email;
    //   addUserCollection(id, email);
    // }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.toString() });
  }
  return res.status(200).json({ success: true });
};

export default handler;
