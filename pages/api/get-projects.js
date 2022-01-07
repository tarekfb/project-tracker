// import { initAuth } from '@/firebase/FirebaseAuth';
// import { db } from '@/firebase/FirebaseApp';
// import { getProjects } from '@/firebase/DbQueries';
// import Cryptr from 'cryptr';

// initAuth();

// const getProject = async (id) => {
//   //   let snapShot = await db.collection('users').doc(id).get();
//   //   if (!snapShot.exists) {
//   //     console.log("user doesn't exists yet. adding!");
//   //     let data = {
//   //       email: email,
//   //     };
//   //     let setDoc = await db.collection('users').doc(id).set(data);
//   //     console.log(setDoc);
//   //   }
// };

// const verify = async (token, userId) => {};

// // const handleGetProjects = async (userId) => {
// //   // get dbToken
// //   let dbToken = '123';

// //   // decrypt
// //   // const cryptr = new Cryptr('pt2021');
// //   // token = cryptr.decrypt(token);
// //   // dbToken = cryptr.decrypt(dbToken);

// //   // verify
// //   // if (verify(token, userId)){
// //   // fetch projects
// //   let projects = await getProjects(userId);
// //   console.log(projects);
// //   // }

// //   return projects;
// // };

// const handleGetProjects = async (userId) => {
//   console.log('inside handle get projects');
//   let projects = await getProjects(userId);
//   console.log(projects);
//   return projects;
// };

// const handler = async (req, res) => {
//   let projects;
//   console.log('HEre');
  
//   try {
//     // const body = JSON.parse(req.body);
//     // projects = handleGetProjects(body.id);
//     // console.log(data.id);
//     // projects = await getProjects(data.id, data.email);
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({ error: 'Unexpected error.' });
//   }
//   return res.status(200).json({ projects });
// };

// export default handler;
