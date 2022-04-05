import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { siteTitle } from '@/components/Layout';
import { PrimaryButton } from '@/components/PrimaryButton';
import { StartItem } from '@/components/StartItem';
import student from '../public/student-849822.jpg';
import { ImageOverlay } from '@/components/TextOnImage';

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Track your projects" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{siteTitle}</title>
      </Head>
      <div className="group z-10 w-full fixed flex flex-row justify-end space-x-4 lg:space-x-6 items-center text-white px-4 py-2 lg:py-4 lg:px-5 bg-col hover:bg-white hover:text-black">
        {/* <Link href="/" className="mr-auto">
          <a>
            <h1 className="text-4xl">
              {siteTitle}
            </h1>
          </a>
        </Link> */}
        <Link href="/home">
          <a>
            <h2 className="text-2xl">Home</h2>
          </a>
        </Link>
        <Link href="/auth">
          <a>
            <h2 className="text-2xl">Login</h2>
          </a>
        </Link>
        <Link href="/auth">
          <a>
            <h2 className="text-2xl border-2 group-hover:border-black px-2 py-1">Sign up</h2>
          </a>
        </Link>
      </div>
      <main className="flex flex-col space-y-2">
        <header>
          <ImageOverlay
            src={student}
            title={siteTitle}
            subtitle="Like trello, but worse"
            positioning="top-28 lg:top-40 left-5 lg:left-10"
            alt="person with notepad and laptop at coffee shop"
          >
            {/* <h1 className="text-white py-1 px-2 bg-gray-700 text-3xl lg:text-7xl">{siteTitle}</h1> */}
            <h3 className="text-white py-1 px-2 bg-gray-700 text-2xl lg:text-5xl">{siteTitle}</h3>
            <h4 className="text-white py-1 px-2 bg-gray-700 text-xl lg:text-3xl">Like trello, but worse</h4>
          </ImageOverlay>
        </header>
        <div className="flex flex-col items-center space-y-2 p-4">
          <div className="flex space-x-2 flex-wrap">
            <StartItem heading="New user?">
              <PrimaryButton content="SIGN UP" href="/auth" />
            </StartItem>
            <StartItem heading="New user?">
              <PrimaryButton content="HOME" href="/home" />
            </StartItem>
          </div>
        </div>
      </main>
    </>
  );
}
