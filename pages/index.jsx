import Head from 'next/head';
import React from 'react';
import Layout, { siteTitle } from 'components/Layout';
import { Projects } from 'components/Projects';
import { useProjectContext } from '@/contexts/ProjectContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/FirebaseApp';

export default function Home() {
  const { projects, setProjectsWrapper } = useProjectContext();

  const [user, loading, error] = useAuthState(auth);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {user ? <Projects /> : <div className="text-lg">Please login</div>}
    </Layout>
  );
}
