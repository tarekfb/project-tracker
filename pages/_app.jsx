// import '../styles/global.css'
import 'tailwindcss/tailwind.css';
import { useProjectContextValue, ProjectContext } from '../components/contexts/ProjectContext';

// import App from 'next/app'

function MyApp({ Component, pageProps }) {
  const projectContextValue = useProjectContextValue();

  return (
    <ProjectContext.Provider value={projectContextValue}>
      <Component {...pageProps} />
    </ProjectContext.Provider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
