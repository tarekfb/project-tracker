import React, { useState } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import firebase from 'firebase/FirebaseApp';
import { initAuth } from '@/firebase/FirebaseAuth';
import { useSignInWithEmailAndPassword, useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { ClipLoader } from 'react-spinners';
import { InputAdornment, TextField } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';
import { useSavingContext } from '@/components/contexts/SavingContext';

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

  return (
    <Layout>
      <Head>
        <title>Project-tracker | Authentication</title>
      </Head>
      <div className="flex flex-col justify-center align-center items-center space-y-2">
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
                <button
                  className="rounded-md
            bg-gradient-main
            py-2 px-10 
            text-white 
            transition-all 
            duration-500 
            transform 
            hover:scale-110  
            hover:opacity-75"
                  onClick={signIn}>
                  SIGN IN
                </button>
                <button
                  className="rounded-md
            bg-gradient-main
            py-2 px-10 
            text-white 
            transition-all 
            duration-500 
            transform 
            hover:scale-110  
            hover:opacity-75"
                  onClick={register}>
                  REIGSTER
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <button onClick={logOut}>sign out</button>
            <div>
              Current User:
              {authStateUser ? <span>{authStateUser.email}</span> : <span>not auth</span>}
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
