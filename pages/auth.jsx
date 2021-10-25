import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import { auth } from '@/firebase/FirebaseApp';
import { withAuthUser, AuthAction, useAuthUser } from 'next-firebase-auth';
import Loader from '@/components/Loader';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import AuthForm from '@/components/AuthForm';
import { server } from '@/config/server';

const LoginPage = () => {
  const authUser = useAuthUser();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const signIn = (email, password) => {
    try {
      signInWithEmailAndPassword(email, password);
    } catch {
      console.log(signInError);
    }
  };

  const register = async (email, password) => {
    let pattern = '(?=.*[0-9a-zA-Z]).{6,}'; // min 6, any char allowed: https://stackoverflow.com/a/65641047
    if (!password.match(pattern)) {
      alert('password needs a minimum of 6 in length');
    } else {
      try {
        const response = await auth.createUserWithEmailAndPassword(email, password);
        fetchRegister(response.user);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const fetchRegister = async (user) => {
    const userObj = {
      id: user.uid,
      email: user.email,
    };

    const response = await fetch(`${server}/api/register`, {
      method: 'POST',
      body: JSON.stringify(userObj),
      headers: {
        Authorization: authUser.getIdToken(),
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
  };

  return (
    <Layout>
      <Head>
        <title>Project-tracker | Authentication</title>
      </Head>
      <AuthForm register={register} signIn={signIn} />
    </Layout>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: Loader,
})(LoginPage);
