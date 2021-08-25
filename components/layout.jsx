import Head from 'next/head';
import { Navbar } from './navbar/Navbar';
import { useState } from 'react';
import { useSavingContextValue } from './contexts/SavingContext';

export const siteTitle = 'Project tracker';

export default function Layout({ children }) {
  // const [loadingToDb, setLoadingToDb] = useState(false);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Track your projects" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="h-screen w-screen">
        <header>
          <Navbar />
        </header>
        <main className="p-5">{children}</main>
      </div>
    </>
  );
}
