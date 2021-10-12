import React, { useState } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import firebase from 'firebase/FirebaseApp';
import { useAuthContext } from 'components/contexts/AuthContext';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { ClipLoader } from 'react-spinners';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { userState, setUserWrapper } = useAuthContext();

  const auth = firebase.auth();
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const logOut = () => {
    auth.signOut();
    setUserWrapper(null);
  };

  const signIn = (email, password) => {
    try {
      signInWithEmailAndPassword(email, password);
      setUserWrapper(user);
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
      <div className={loading ? 'backdrop-filter backdrop-blur-lg' : ''}>
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
          <button onClick={() => logOut()}>sign out</button>
          <button onClick={() => signIn(email, password)}>sign in</button>
          <p>Current User: {userState ? <span>auth</span> : <span>not auth</span>}</p>
        </div>
      </div>
    </Layout>
  );
}
