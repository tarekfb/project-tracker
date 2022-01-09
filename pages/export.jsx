import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuthUser, withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth';
import { Layout } from '@/components/Layout';
import { Loader } from '@/components/Loader';
import { server } from '@/config/server';
import { createApiKey, getApiKey } from '@/firebase/DbQueries';
import { CopyAll } from '@mui/icons-material';
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

    // const dataObj = {
    //   id: 'DL07mjEzvkaWsnoiNDWpI5vN1px2',
    //   token: 'bEiBU9sxKFce1OrQV3a4g0VyAQ23',
    // };

    try {
      // const options = {
      //   method: 'GET',
      //   headers: new Headers({ 'content-type': 'application/json', 'authorization': '123' }),
      //   mode: 'no-cors',
      // };
      let response = await fetch(`${server}/api/${apiKey}`);
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

  // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
  return (
    <Layout>
      <Head>
        <title>Project-tracker | Api</title>
      </Head>
      {apiKey ? (
        <div className="mb-2">
          <h1 className="font-bold text-3xl mb-2">Your api key is:</h1>
          <div className="p-4 bg-gray-200 flex flex-col">
            <p className="self-right break-all">{apiKey}</p>
            <button
              className="self-end"
              title="Copy to clipboard"
              onClick={() => {
                navigator.clipboard.writeText(apiKey);
              }}
            >
              <CopyAll />
            </button>
          </div>
        </div>
      ) : (
        <p>You can generate an api key using the button below</p>
      )}
      <div className="flex flex-row space-x-4">
        <button className="action-button" onClick={testApi}>
          TEST GET PROJECTS API
        </button>
        <button className="action-button" onClick={handleGenerateApiKey}>
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
