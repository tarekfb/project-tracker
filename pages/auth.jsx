import React, { useState } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import firebase from 'firebase/FirebaseApp';
import { useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import { ClipLoader } from 'react-spinners';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = firebase.auth();
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [firebaseUser] = useAuthState(auth);

  const logOut = () => {
    auth.signOut();
  };

  const signIn = (email, password) => {
    try {
      signInWithEmailAndPassword(email, password);
    } catch {
      console.log(error);
    }
    setEmail('');
    setPassword('');
  };

  return (
    <Layout>
      <Head>
        <title>Authentication</title>
      </Head>
      <div class="min-h-screen flex items-start justify-start">
        <div className="relative w-full">
          {loading && (
            <div className="absolute flex h-full w-full backdrop-filter backdrop-blur-sm">
              <div className="m-auto">
                <ClipLoader size={150} />
              </div>
            </div>
          )}
          <div className="flex flex-col w-4/12">
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => logOut()}>sign out</button>
            <button onClick={() => signIn(email, password)}>sign in</button>
            <p>Current User: {firebaseUser ? <span>auth</span> : <span>not auth</span>}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
