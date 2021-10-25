import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
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
      {/* {user ? <Projects /> : <div className="text-lg">Please login</div>} */}
      <div>
        This is list sort of thing. Like trello, but worse. You can login
        <Link href="/auth">
          <a> here</a>
        </Link>
        . You can also go to your projects
        <Link href="/projects">
          <a> here</a>
        </Link>
        .
      </div>
    </Layout>
  );
}
