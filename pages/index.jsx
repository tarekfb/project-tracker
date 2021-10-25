import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from 'components/Layout';
// import { Projects } from 'components/Projects';
// import { useProjectContext } from '@/contexts/ProjectContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/FirebaseApp';

export default function Home() {
  // const { projects, setProjectsWrapper } = useProjectContext();

  const [user, loading, error] = useAuthState(auth);

  return (
      <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* {user ? <Projects /> : <div className="text-lg">Please login</div>} */}
      <p>This is list sort of thing. Like trello, but worse.</p>
      <div className="flex flex-col space-y-2">
        <Link href="/auth">
          <a>auth</a>
        </Link>
        <Link href="/projects">
          <a>projects</a>
        </Link>
        <Link href="/profile">
          <a>profile</a>
        </Link>
      </div>
    </Layout>
  );
}
