import Head from 'next/head';
import React from 'react';
import Layout, { siteTitle } from 'components/Layout';
import { Projects } from 'components/Projects';
import { useProjectContext } from '@/contexts/ProjectContext';

export default function Home() {
  const { projects, setProjectsWrapper } = useProjectContext();

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Projects />
    </Layout>
  );
}
