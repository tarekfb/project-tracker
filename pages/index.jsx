import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { siteTitle, Layout } from '@/components/Layout';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <p className="mb-2">This is list sort of thing. Like trello, but worse.</p>
      <div className="flex flex-col space-y-2">
        <Link href="/auth">
          <a>{`> sign in`}</a>
        </Link>
        <Link href="/projects">
          <a>{`> projects`}</a>
        </Link>
        <Link href="/profile">
          <a>{`> profile`}</a>
        </Link>
      </div>
    </Layout>
  );
}
