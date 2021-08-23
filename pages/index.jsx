import Head from 'next/head';
import React from 'react';
import Layout, { siteTitle } from '../components/Layout';
import { Projects } from '../components/Projects';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Projects />
    </Layout>
  );
}
