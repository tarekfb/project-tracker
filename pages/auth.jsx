import React, { useState } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import firebase from 'firebase/FirebaseApp';
import { useSignInWithEmailAndPassword, useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { ClipLoader } from 'react-spinners';
import { InputAdornment, TextField } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';
import { AuthAction } from '@/components/auth/AuthAction';
import { useSavingContext } from '@/components/contexts/SavingContext';
import { getAllProjectIds } from '@/components/contexts/ProjectContext';

const ref = firebase.firestore().collection('/users/');

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { toggleIsSaving } = useSavingContext();

  const auth = firebase.auth();
  const [signInWithEmailAndPassword, signInUser, signInLoading, signInError] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, createUser, createLoading, createError] = useCreateUserWithEmailAndPassword(auth);
  const [authStateUser, authStateLoading, authStateError] = useAuthState(auth);

  const logOut = () => {
    auth.signOut();
  };

  const signIn = () => {
    try {
      signInWithEmailAndPassword(email, password);
    } catch {
      console.log(signInError);
    }
    setEmail('');
    setPassword('');
  };

  const register = async () => {
    let pattern = '(?=.*[0-9a-zA-Z]).{6,}'; // min 6, any char allowed: https://stackoverflow.com/a/65641047
    if (!password.match(pattern)) {
      alert('password needs a minimum of 6 in length');
    } else {
      try {
        toggleIsSaving(true);

        // register user in auth service
        createUserWithEmailAndPassword(email, password);

        // create user object locally
        let userObj = {
          email: email,
        };
        response = await ref.add(userObj);

        let snapshot = await firebase.firestore().collection('/users/wPecInICm1CsUbDg8lmQ/projects/').get();
        console.log(snapshot.size);

        toggleIsSaving(false);
      } catch {
        console.log(createError);
      }
      setEmail('');
      setPassword('');
    }
  };

  const styles = {
    underline: {
      '&::before': {
        borderBottom: '1px solid #90caf9',
      },
      '&:hover:not(.Mui-disabled):before': {
        borderBottom: '2px solid #90caf9',
      },
      '&::after': {
        borderBottom: '2px solid #90caf9',
      },
    },
    input: {
      '&:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 1000px black inset',
      },
    },
  };

  const test = async () => {
    let list = await getAllProjectIds();
    // const ref1 = firebase.firestore().collection('/users/');
    // let id;
    // ref1.get().then((user) => {
    //   user.docs.map((doc) => {
    //     if (doc.data().email == 'tarekfb69@gmail.com') {
    //       id = doc.id;
    //     }
    //   });
    // });
    // let newRef = firebase.firestore().collection(`/users/${id}/projects/`);
    // let querySnapshot = await newRef.get();
    // console.log(querySnapshot.size);
    // console.log(querySnapshot.docs);
    // console.log(id);
    // newRef.get().then((project) => {
    //   console.log(project.docs);
    //   project.docs.map((doc) => {
    //     doc.data();
    //   });
    // });

    // let id;
    // console.log('NEW TRY_____________________________');
    // const ref2 = firebase.firestore().collection('/users/');
    // ref2.get().then((user) => {
    //   user.docs.map(async (doc) => {
    //     if (doc.data().email == 'tarekfb69@gmail.com') {
    //       id = doc.id;
    //       let test = await doc.collection('projects').get();
    //       console.log(doc);
    //       console.log(test);
    //       console.log(doc.collection('projects').get());
    //       console.log(test.size);
    //       // doc
    //       //   .collection('projects')
    //       //   .get()
    //       //   .then((user) => {
    //       //     user.docs.map((doc) => {
    //       //       console.log('from inner');

    //       //       console.log(doc.data());
    //       //     });
    //       //   });
    //     }
    //   });
    // });
    // https://www.google.com/search?q=firestore+react+hooks+user+email&rlz=1C1CHBF_svSE958SE958&oq=firestore+react+hooks+user+email&aqs=chrome..69i57j0i22i30.7211j0j7&sourceid=chrome&ie=UTF-8

    // firebase
    //   .firestore()
    //   .collection('users')
    //   .doc(id)
    //   .collection('projects')
    //   .get()
    //   .then((querySnapshot) => {
    //     console.log(querySnapshot.docs);
    //   });

    // ref2.get().then((project) => {
    //   project.docs.map((doc) => {
    //     console.log(doc.data());
    //   });
    // });

    // can't manage to access the docs for a project
    // what i want to do is find the size, or docs, for any project
    // it always returns 0 atm
    // i'm trying to find size or docs so I then can determine if a given user has any proejct
    // if no projects, dont try to query on /projects
    // instead return 0 static paths in [id]

    // return querySnapshot.size;
  };

  return (
    <Layout>
      <Head>
        <title>Authentication</title>
      </Head>
      <div className="flex flex-col justify-center align-center items-center space-y-2">
        <button onClick={test}>test</button>
        {!authStateUser ? (
          <>
            <TextField
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              variant="outlined"
              type="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                style: {
                  WebkitBoxShadow: '0 0 0 1000px white inset',
                },
              }}
            />
            <TextField
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              variant="outlined"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              // InputProps (capital i) provides props for material Input componenet
              inputProps={{
                style: {
                  WebkitBoxShadow: '0 0 0 1000px white inset',
                },
              }}
              // inputProps provides props for html input element
              // webkitboxshadow removes blue bg on autofill
            />
            {signInLoading || createLoading ? (
              <ClipLoader size={50} />
            ) : (
              <div className="flex flex-row space-x-2">
                <AuthAction action={signIn} content="log in" />
                <AuthAction action={register} content="register" />
              </div>
            )}
          </>
        ) : (
          <>
            <button onClick={logOut}>sign out</button>
            <div>
              Current User:
              {authStateUser ? <span>auth</span> : <span>not auth</span>}
              {signInLoading && (
                <div className="m-auto">
                  <ClipLoader size={50} />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
