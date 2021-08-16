import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const name = 'An Actual Name'
export const siteTitle = 'Project tracker'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Track your projects"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
        {/* navbar */}
        <div className="container flex justify-end space-x-4 p-2">
          <h1 className="text-4xl mr-auto">
            <Link href="/">
              <a>Project tracker</a>
            </Link>
          </h1>
          <Link href="/">
            <a>Home</a>
          </Link>
          <div>Projects<ArrowDropDownIcon /></div>
        </div>
      </header>
      <main className="container p-5 space-y-2">
        {children}
      </main>
    </div>
  )
}