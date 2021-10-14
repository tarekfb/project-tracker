import React, { useState } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import firebase from 'firebase/FirebaseApp';
import { useSignInWithEmailAndPassword, useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { ClipLoader } from 'react-spinners';
import { InputAdornment, TextField } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = firebase.auth();
  const [signInWithEmailAndPassword, signInUser, signInLoading, signInError] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, createUser, createLoading, createError] = useCreateUserWithEmailAndPassword(auth);
  const [authStateUser, authStateLoading, authStateError] = useAuthState(auth);

  const logOut = () => {
    auth.signOut();
  };

  const signIn = (email, password) => {
    try {
      signInWithEmailAndPassword(email, password);
    } catch {
      console.log(signInError);
    }
    setEmail('');
    setPassword('');
  };

  const register = (email, password) => {
    let pattern = '(?=.*[0-9a-zA-Z]).{6,}'; // min 6, any char allowed: https://stackoverflow.com/a/65641047
    if (!password.match(pattern)) {
      alert('password needs a minimum of 6 in length');
    } else {
      try {
        createUserWithEmailAndPassword(email, password);
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

  return (
    <Layout>
      <Head>
        <title>Authentication</title>
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
              inputProps={{
                style: {
                  WebkitBoxShadow: '0 0 0 1000px white inset',
                },
              }}
            />
            {signInLoading ? <ClipLoader size={50} /> : <button onClick={() => signIn(email, password)}>log in</button>}
            {createLoading ? <ClipLoader size={50} /> : <button onClick={() => register(email, password)}>register</button>}
          </>
        ) : (
          <>
            <button onClick={logOut}>sign out</button>
            <p>
              Current User:
              {authStateUser ? <span>auth</span> : <span>not auth</span>}
              {signInLoading && (
                <div className="m-auto">
                  <ClipLoader size={50} />
                </div>
              )}
            </p>
          </>
        )}
      </div>
    </Layout>
  );
}
