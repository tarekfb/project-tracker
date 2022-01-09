import Head from 'next/head';
import { ClipLoader } from 'react-spinners';
import { useBlurContext } from '@/contexts/BlurContext';
import { Navbar } from '@/components/navbar/Navbar';

export const siteTitle = 'Project tracker';

export const Layout = ({ children }) => {
  const { blur } = useBlurContext();

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
      </Head>
      <div className="h-screen w-screen">
        <header>
          <Navbar />
        </header>
        <div className="relative w-full">
          {blur && (
            <div className="mt-5 absolute flex h-full w-full backdrop-filter backdrop-blur-sm">
              <div className="m-auto">
                <ClipLoader size={150} />
              </div>
            </div>
          )}
          <main className="p-5">{children}</main>
        </div>
      </div>
    </>
  );
};
