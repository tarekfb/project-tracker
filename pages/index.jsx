import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '@/components/Layout';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
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
