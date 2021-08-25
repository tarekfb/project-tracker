// import '../styles/global.css'
import 'tailwindcss/tailwind.css';
import { useState, createContext } from 'react';

import { useProjectContextValue, ProjectContext } from '../components/contexts/ProjectContext';
// import { useSavingContextValue, SavingContext } from '../components/contexts/SavingContext';

// import App from 'next/app'

function MyApp({ Component, pageProps }) {
  const projectContextValue = useProjectContextValue();
  // const { isSaving, handleSaving } = useSavingContextValue();

  const SavingContext = createContext(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaving = (bool) => {
    console.log('CALLED HANDLESAVING BOOL IS', bool);
    if (isSaving !== bool) {
      setIsSaving(bool);
    }
  };

  return (
    <SavingContext.Provider value={{ isSaving, handleSaving }}>
      <ProjectContext.Provider value={projectContextValue}>
        <Component {...pageProps} />
      </ProjectContext.Provider>
    </SavingContext.Provider>
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
