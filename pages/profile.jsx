import React from 'react';
import Head from 'next/head';
import { useAuthUser, withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth';
import { Layout } from '@/components/Layout';
import { auth } from '@/firebase/FirebaseApp';
import { Loader } from '@/components/Loader';

const Profile = () => {
  const AuthUser = useAuthUser();

  const logOut = async () => {
    auth.signOut();
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
        onClick={logOut}
      >
        SIGN OUT
      </button>
    </Layout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.RENDER,
  LoaderComponent: Loader,
})(Profile);
