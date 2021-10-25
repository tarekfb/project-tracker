import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import firebase from 'firebase';
import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import Loader from '@/components/Loader';

const Profile = () => {
  const AuthUser = useAuthUser();

  const signOut = async () => {
    firebase.auth().signOut();
  };

  return (
    <Layout>
      <Head>
        <title>Project-tracker | Profile</title>
      </Head>
      <div className="flex flex-col space-y-2">
        <p>Your email is {AuthUser.email ? AuthUser.email : 'unknown'}.</p>
        <p>Your id is {AuthUser.id ? AuthUser.id : 'unknown'}.</p>
      </div>
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
        onClick={signOut}>
        SIGN OUT
      </button>
    </Layout>
  );
};

// Note that this is a higher-order function.
export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(Profile);
