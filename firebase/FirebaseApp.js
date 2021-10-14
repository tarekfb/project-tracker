import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID,
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
// // import firebase from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// // import 'firebase/firestore';

// import { initializeApp, getApps } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// const projectAuth = getAuth(app);
// const projectFirestore = getFirestore(app);

// export { projectAuth, projectFirestore };

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGE_SENDER_ID,
//   appId: process.env.APP_ID,
// };

// let app;
// if (getApps().length < 1) {
//   app = initializeApp(firebaseConfig);
// } else {
//   app(); // if already initialized, use that one
// }

// export default firebase;

// this version of code doesn't seem to support
// import firebase from 'firebase/app';

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGE_SENDER_ID,
//   appId: process.env.APP_ID,
// };

// let app;
// if (firebase.apps.length < 1) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app(); // if already initialized, use that one
// }

// let auth = firebase.auth();
// let firestore = firebase.firestore(app);

// export { auth, firestore };
// export default firebase;
