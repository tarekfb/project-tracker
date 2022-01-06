import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuthUser, withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth';
import { Layout } from '@/components/Layout';
import { Loader } from '@/components/Loader';
import { server } from '@/config/server';
import { createApiKey, getApiKey } from '@/firebase/DbQueries';

const Export = () => {
  const AuthUser = useAuthUser();
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    handleGetApiKey();
  });

  const testApi = async () => {
    // rewrite to use dbQueries location

    // const cryptr = new Cryptr('pt2021');
    // const token = cryptr.encrypt('bEiBU9sxKFce1OrQV3a4g0VyAQ23');

    const dataObj = {
      id: 'DL07mjEzvkaWsnoiNDWpI5vN1px2',
      token: 'bEiBU9sxKFce1OrQV3a4g0VyAQ23',
    };

    try {
      let response = await fetch(`${server}/api/${AuthUser.id}`);
      // let response = await fetch(`${server}/api/get-projects`, {
      //   method: 'POST',
      //   body: JSON.stringify(dataObj),
      //   headers: {
      //     // Authorization: AuthUser.id(),
      //     'Content-Type': 'application/json',
      //   },
      // });

      let data = await response.json();

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleGenerateApiKey = () => {
    createApiKey(AuthUser.id);
  };

  const handleGetApiKey = async () => {
    const apiKey = await getApiKey(AuthUser.id);
    if (apiKey) {
      setApiKey(apiKey);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Project-tracker | Api</title>
      </Head>
      {apiKey ? <p>Your api key is {apiKey}</p> : <p>You can generate an api key using the button below</p>}

      <div className="flex flex-row space-x-4">
        <button
          className="ml-5 rounded-md
            bg-gradient-main
            py-2 px-10 
            text-white 
            transition-all 
            duration-500 
            transform 
            hover:scale-110  
            hover:opacity-75"
          onClick={testApi}
        >
          TEST GET PROJECTS API
        </button>
        <button
          className="ml-5 rounded-md
            bg-gradient-main
            py-2 px-10 
            text-white 
            transition-all 
            duration-500 
            transform 
            hover:scale-110  
            hover:opacity-75"
          onClick={handleGenerateApiKey}
        >
          GENERATE API KEY
        </button>
      </div>
    </Layout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.RENDER,
  LoaderComponent: Loader,
})(Export);
