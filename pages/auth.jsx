import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import firebase from '../firebase/FirebaseApp';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { ClipLoader } from 'react-spinners';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = firebase.auth();
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const signIn = (email, password) => {
    signInWithEmailAndPassword(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <Layout>
      <Head>
        <title>Authentication</title>
      </Head>
      {loading && (
        <div className="flex h-screen backdrop-filter backdrop-blur-lg">
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
        <button onClick={() => auth.signOut()}>sign out</button>
        <button onClick={() => signIn(email, password)}>Sign In</button>
        <p>Current User: {user ? <span>auth</span> : <span>not auth</span>}</p>
      </div>
    </Layout>
  );
}
