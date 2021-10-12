import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Layout, { siteTitle } from '../components/Layout';
import { Projects } from '../components/Projects';
import { ClipLoader } from 'react-spinners';

export default function Home() {
  const [loadNewProject, setLoadNewProject] = useState(false);

  useEffect(() => {
    setLoadNewProject(false);
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {loadNewProject && (
        <div className="flex h-screen">
          <div className="m-auto">
            <ClipLoader size={150} />
          </div>
        </div>
      )}
      <Projects setLoadNewProject={setLoadNewProject} />
    </Layout>
  );
}
