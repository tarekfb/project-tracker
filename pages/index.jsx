import Head from 'next/head';
import React, { useEffect } from 'react';
import Layout, { siteTitle } from '../components/Layout';
import { Projects } from '../components/Projects';
import { ClipLoader } from 'react-spinners';
import { useBlurContext } from '@/components/contexts/BlurContext';

export default function Home() {
  const { toggleBlur } = useBlurContext();

  useEffect(() => {
    // toggleBlur(false);
  }, []);

  // STÄÅNG AV I PROJECTS

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Projects />
    </Layout>
  );
}
