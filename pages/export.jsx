import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuthUser, withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth';
import { Layout } from '@/components/Layout';
import { Loader } from '@/components/Loader';
import { server } from '@/config/server';
import { createApiKey, getApiKey } from '@/firebase/DbQueries';
import { CopyAll, Visibility } from '@mui/icons-material';
const Export = () => {
  const AuthUser = useAuthUser();
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    handleGetApiKey();
  }, []);

  const testApi = async () => {
    try {
      let response = await fetch(`${server}/api/${apiKey}`);
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
    setLoading(true);
    const apiKey = await getApiKey(AuthUser.id);
    if (apiKey) {
      setApiKey(apiKey);
    }
    setLoading(false);
  };

  // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
  return (
    <Layout>
      <Head>
        <title>Project-tracker | Api</title>
      </Head>
      <h1 className="font-bold text-3xl mb-2">Your api key:</h1>
      {loading ? (
        <p>Loading...</p>
      ) : apiKey ? (
        <>
          <div className="p-4 mb-2 bg-gray-200 flex flex-col">
            <p className={`break-all ${!visible && 'filter blur-sm'}`}>{apiKey}</p>
            <div className="self-end flex flex-row space-x-2">
              <button title="Toggle visibility" onClick={() => setVisible((visible) => !visible)}>
                <Visibility />
              </button>
              <button
                title="Copy to clipboard"
                onClick={() => {
                  navigator.clipboard.writeText(apiKey);
                }}
              >
                <CopyAll />
              </button>
            </div>
          </div>
          <button className="action-button align-middle" onClick={testApi}>
            TEST GET PROJECTS API
          </button>
        </>
      ) : (
        <>
          <p className="mb-2">You can generate an api key using the button below</p>
          <button className="action-button" onClick={handleGenerateApiKey}>
            GENERATE API KEY
          </button>
        </>
      )}
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
