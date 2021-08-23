import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
// import { StyledFirebaseAuth } from 'react-firebaseui';
// import { FirebaseAuth } from '../components/FirebaseAuth';
// import FirebaseAuth from '../components/FirebaseAuth';
import firebase from '../firebase/clientApp';
import '../node_modules/firebaseui/dist/firebaseui.css';

const uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.EmailAuthProvider],
};

export default function SignInScreen() {
  return (
    <Layout>
      <Head>
        <title>Authentication</title>
      </Head>
      <div className="flex flex-col justify-center">
        <p>Sign in with email/password:</p>
        {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
      </div>
    </Layout>
  );
}
